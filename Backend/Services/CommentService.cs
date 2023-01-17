using StackExchange.Redis;
using Backend.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Backend.Services;

public interface ICommentService
{
    Task<List<CommentDto>> GetPostComments(string postId, int page);
    Task<ServiceResult<CommentDto>> AddComment(CommentCreateDto comment, string authorId);
    Task<ServiceResult<CommentDto>> UpdateComment(CommentUpdateDto comment, string userId);
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

    public async Task<List<CommentDto>> GetPostComments(string postId, int page)
    {
        string key = "comments:" + postId;

        var list = await _redisDb.ListRangeAsync(key, page * 10, (page + 1) * 10 - 1);

        var comments = list.Select(redisValue =>
                JsonSerializer.Deserialize<Comment?>(redisValue!)
            );

        List<CommentDto> commentDtos = new();

        foreach (var comment in comments)
        {
            var author = (await _userService.GetById(comment!.AuthorId)).Result;
            commentDtos.Add(new CommentDto()
            {
                ID = comment.ID,
                Text = comment.Text,
                PublicationTime = comment.PublicationTime,
                Author = author
            });
        }
        return commentDtos;
    }

    public async Task<ServiceResult<CommentDto>> AddComment(
        CommentCreateDto commentCreateDto, string authorId)
    {
        string key = "comments:" + commentCreateDto.PostId;

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

        //await _redisDb.SortedSetAddAsync(key, serializedComment, comment.PublicationTime.Ticks);

        await _redisDb.ListRightPushAsync(key, serializedComment);

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

    public Task<ServiceResult<CommentDto>> UpdateComment(CommentUpdateDto comment, string userId)
    {
        throw new NotImplementedException();
    }
}