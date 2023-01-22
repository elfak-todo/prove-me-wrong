using StackExchange.Redis;
using Backend.Models;
using System.Text.Json;

namespace Backend.Services;

public interface ICommentService
{
    Task<ServiceResult<List<CommentDto>>> GetPostComments(string postId, int page, string sortType, string userId);
    Task<ServiceResult<CommentDto>> AddComment(CommentCreateDto comment, string authorId);
    Task<ServiceResult<CommentDto>> UpdateComment(CommentUpdateDto comment, string userId);
    Task<ServiceResult<bool>> SetLiked(string commentId, string postId, string userId, bool liked);
    Task<ServiceResult<string>> DeleteComment(string commentId, string postId, string userId);
}

public class CommentService : ICommentService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _redisDb;
    private readonly IUserService _userService;

    public CommentService(IConnectionMultiplexer redis, IUserService userService)
    {
        _redis = redis;
        _redisDb = redis.GetDatabase();
        _userService = userService;
    }

    public async Task<ServiceResult<List<CommentDto>>> GetPostComments(string postId, int page, string sortType, string userId)
    {
        if (sortType != "newest" && sortType != "most-liked")
        {
            return new ServiceResult<List<CommentDto>>()
            {
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "BadRequest",
            };
        }

        string key = "comments:" + postId + ":" + sortType;

        int offset = page * 10;

        var list = await _redisDb.SortedSetRangeByRankAsync(key, -10 - offset, -1 - offset, Order.Descending);

        var comments = list.Select(commentId =>
        {
            var commentJson = _redisDb.StringGet("comment:" + commentId);
            return JsonSerializer.Deserialize<Comment?>(commentJson!);
        });

        List<CommentDto> commentDtos = new();

        foreach (var comment in comments)
        {
            var author = (await _userService.GetById(comment!.AuthorId)).Result;
            var likeCount = await _redisDb.SortedSetScoreAsync("comments:" + postId + ":most-liked", comment.ID);
            var isLiked = await _redisDb.SetContainsAsync("user:" + userId + ":liked", comment.ID);

            commentDtos.Add(new CommentDto()
            {
                ID = comment.ID,
                Text = comment.Text,
                PublicationTime = comment.PublicationTime,
                Author = author,
                LikeCount = (int)likeCount,
                IsLiked = isLiked
            });
        }

        return new ServiceResult<List<CommentDto>>()
        {
            StatusCode = ServiceStatusCode.Success,
            Result = commentDtos
        };
    }

    public async Task<ServiceResult<CommentDto>> AddComment(
        CommentCreateDto commentCreateDto, string authorId)
    {
        string commentId = Guid.NewGuid().ToString();
        DateTime publicationTime = DateTime.Now;

        Comment comment = new()
        {
            ID = commentId,
            AuthorId = authorId,
            Text = commentCreateDto.Text,
            PublicationTime = publicationTime
        };

        string? serializedComment = JsonSerializer.Serialize(comment);

        if (serializedComment == null)
        {
            return new ServiceResult<CommentDto>()
            {
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "BadRequest",
            };
        }

        string postCommentsKey = "comments:" + commentCreateDto.PostId;
        string commentKey = "comment:" + commentId;

        await _redisDb.SortedSetAddAsync(postCommentsKey + ":newest", commentId, comment.PublicationTime.Ticks);
        await _redisDb.SortedSetAddAsync(postCommentsKey + ":most-liked", commentId, 0);
        await _redisDb.StringSetAsync(commentKey, serializedComment);

        var user = await _userService.GetById(authorId);

        CommentDto commentDto = new()
        {
            ID = commentId,
            Author = user.Result,
            Text = commentCreateDto.Text,
            PublicationTime = publicationTime
        };

        return new ServiceResult<CommentDto>()
        {
            StatusCode = ServiceStatusCode.Success,
            Result = commentDto
        };
    }

    public async Task<ServiceResult<CommentDto>> UpdateComment(CommentUpdateDto commentUpdateDto, string userId)
    {
        string commentKey = "comment:" + commentUpdateDto.CommentId;

        var jsonComment = await _redisDb.StringGetAsync(commentKey);
        var comment = JsonSerializer.Deserialize<Comment?>(jsonComment!);

        if (comment == null || comment.AuthorId != userId)
        {
            return new ServiceResult<CommentDto>()
            {
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "BadRequest",
            };
        }

        comment.Text = commentUpdateDto.Text;

        var updatedJson = JsonSerializer.Serialize<Comment>(comment);

        await _redisDb.StringSetAsync(commentKey, updatedJson);

        var user = await _userService.GetById(userId);

        CommentDto commentDto = new()
        {
            ID = comment.ID,
            Author = user.Result,
            Text = comment.Text,
            PublicationTime = comment.PublicationTime
        };

        return new ServiceResult<CommentDto>()
        {
            StatusCode = ServiceStatusCode.Success,
            Result = commentDto
        };
    }

    public async Task<ServiceResult<bool>> SetLiked(string commentId, string postId, string userId, bool liked)
    {
        string commentLikedKey = "user:" + userId + ":liked";
        string mostLikedKey = "comments:" + postId + ":most-liked";

        bool alreadyLiked = await _redisDb.SetContainsAsync(commentLikedKey, commentId);

        if (liked && !alreadyLiked)
        {
            await _redisDb.SetAddAsync(commentLikedKey, commentId);
            await _redisDb.SortedSetIncrementAsync(mostLikedKey, commentId, 1);
        }
        else if (!liked && alreadyLiked)
        {
            await _redisDb.SetAddAsync(commentLikedKey, commentId);
            await _redisDb.SortedSetDecrementAsync(mostLikedKey, commentId, 1);
            await _redisDb.SetRemoveAsync(commentLikedKey, commentId);
        }

        return new ServiceResult<bool>()
        {
            StatusCode = ServiceStatusCode.Success,
            Result = liked
        };
    }

    public async Task<ServiceResult<string>> DeleteComment(string commentId, string postId, string userId)
    {
        string commentKey = "comment:" + commentId;

        var jsonComment = await _redisDb.StringGetAsync(commentKey);
        var comment = JsonSerializer.Deserialize<Comment?>(jsonComment!);

        if (comment == null || comment.AuthorId != userId)
        {
            return new ServiceResult<string>()
            {
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "BadRequest",
            };
        }
        await _redisDb.KeyDeleteAsync(commentKey);
        await _redisDb.SortedSetRemoveAsync("comments:" + postId + ":most-liked", commentId);
        await _redisDb.SortedSetRemoveAsync("comments:" + postId + ":newest", commentId);
        await _redisDb.SetRemoveAsync("user:" + userId + ":liked", commentId);

        return new ServiceResult<string>()
        {
            StatusCode = ServiceStatusCode.Success,
            Result = commentId
        };
    }
}