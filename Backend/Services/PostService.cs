using Backend.Models;
using Neo4jClient;
using StackExchange.Redis;


namespace Backend.Services;
public interface IPostService
{
    Task<List<PostFeedData>> GetFeed(string userId, string topicId);
    Task<List<PostFeedData>> GetUserFeed(string userId);
    Task<ServiceResult<PostFeedData>> Create(string authorID, string topicID, Post postData);
    Task<ServiceResult<Post>> Delete(string id);
    Task<ServiceResult<bool>> SetLiked(string userId, string postId, bool isLiked);
}

public class PostService : IPostService
{
    private readonly IGraphClient _client;
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _redisDb;
    private readonly IUserService _userService;
    public PostService(IConnectionMultiplexer redis,
        IGraphClient client, IUserService userService)
    {
        _redis = redis;
        _redisDb = redis.GetDatabase();
        _client = client;
        _userService = userService;
    }

    public async Task<List<PostFeedData>> GetFeed(string userId, string topicId)
    {
        var posts = await _client.Cypher.Match("(post:Post)-[:RELATED_TO]->(topic:Topic), (post:Post)-[:POSTED_BY]->(user:User)")
                                    .Where((Topic topic) => topic.ID == topicId)
                                    .OptionalMatch("(post:Post)-[rel:LIKED_BY]->(viewer:User)")
                                    .Where((User viewer) => viewer.ID == userId)
                                    .With("post, user, CASE WHEN rel IS NOT NULL THEN true ELSE false END AS liked")
                                    .OptionalMatch("(post:Post)-[rel:LIKED_BY]->()")
                                    .With("post, user, liked, COUNT(rel) as likeCount")
                                    .Return((post, user, liked, likeCount) => new PostFeedData
                                    {
                                        Post = post.As<Post>(),
                                        Author = user.As<User>(),
                                        Liked = liked.As<bool>(),
                                        LikeCount = likeCount.As<int>(),
                                    }).ResultsAsync;

        posts = posts.Select(p =>
        {
            p.CommentCount = (int)_redisDb.ListLength("comments:" + p.Post!.ID, CommandFlags.None);
            return p;
        });

        return posts.ToList();
    }

    public async Task<List<PostFeedData>> GetUserFeed(string userId)
    {
        var posts = await _client.Cypher.Match("(post:Post)-[:POSTED_BY]->(user:User)")
                                    .Where((User user) => user.ID == userId)
                                    .OptionalMatch("(post:Post)-[rel:LIKED_BY]->(viewer:User)")
                                    .Where((User viewer) => viewer.ID == userId)
                                    .With("post, user, CASE WHEN rel IS NOT NULL THEN true ELSE false END AS liked")
                                    .OptionalMatch("(post:Post)-[rel:LIKED_BY]->()")
                                    .With("post, user, liked, COUNT(rel) as likeCount")
                                    .Return((post, user, liked, likeCount) => new PostFeedData
                                    {
                                        Post = post.As<Post>(),
                                        Author = user.As<User>(),
                                        Liked = liked.As<bool>(),
                                        LikeCount = likeCount.As<int>()
                                    }).ResultsAsync;

        posts = posts.Select(p =>
        {
            p.CommentCount = (int)_redisDb.ListLength("comments:" + p.Post!.ID, CommandFlags.None);
            return p;
        });

        return posts.ToList();
    }

    public async Task<ServiceResult<PostFeedData>> Create(string authorID, string topicID, Post postData)
    {
        postData.ID = Guid.NewGuid().ToString();
        postData.DatePublished = DateTime.Now;

        var topic = await _client.Cypher.Match("(topic:Topic)")
                                    .Where((Topic topic) => topic.ID == topicID)
                                    .Return(topic => topic.As<Topic>()).ResultsAsync;

        if (topic.SingleOrDefault() == null)
            return new ServiceResult<PostFeedData> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "TopicNotFound" };

        var author = await _userService.GetById(authorID);

        if (author.Result == null)
            return new ServiceResult<PostFeedData> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "UserInvalid" };


        var newPost = await _client.Cypher.Match("(topic:Topic), (user:User)")
                                    .Where((Topic topic) => topic.ID == topicID)
                                    .AndWhere((User user) => user.ID == authorID)
                                    .Create("(post:Post $postData)-[:RELATED_TO]->(topic)")
                                    .WithParam("postData", postData)
                                    .Create("(post)-[:POSTED_BY]->(user)")
                                    .Return(post => post.As<Post>()).ResultsAsync;

        return new ServiceResult<PostFeedData>
        {
            Result = new PostFeedData { Author = author.Result, Post = newPost.Single() },
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<ServiceResult<Post>> Delete(string id)
    {
        var post = await _client.Cypher.Match("(post:Post)")
                                    .Where((Post post) => post.ID == id)
                                    .Return(post => post.As<Post>()).ResultsAsync;

        if (post.FirstOrDefault() == null)
            return new ServiceResult<Post> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "PostNotFound" };

        await _client.Cypher.Match("(post:Post)")
                                    .Where((Post post) => post.ID == id)
                                    .DetachDelete("post").ExecuteWithoutResultsAsync();

        await _redisDb.KeyDeleteAsync("comments:" + id);

        return new ServiceResult<Post> { Result = post.FirstOrDefault(), StatusCode = ServiceStatusCode.Success };
    }

    public async Task<ServiceResult<bool>> SetLiked(string userId, string postId, bool isLiked)
    {
        var user = await _userService.GetById(userId);
        if (user.Result == null)
            return new ServiceResult<bool> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "InvalidUser" };

        var post = await _client.Cypher.Match("(post:Post)")
                                    .Where((Post post) => post.ID == postId)
                                    .Return(post => post.As<Post>()).ResultsAsync;
        if (post.FirstOrDefault() == null)
            return new ServiceResult<bool> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "PostNotFound" };

        if (isLiked)
        {
            await _client.Cypher.Match("(user:User), (post:Post)")
                                    .Where((User user) => user.ID == userId)
                                    .AndWhere((Post post) => post.ID == postId)
                                    .Create("(post)-[:LIKED_BY]->(user)")
                                    .ExecuteWithoutResultsAsync();
        }
        else
        {
            await _client.Cypher.Match("(post:Post)-[rel:LIKED_BY]->(user:User)")
                                    .Where((User user, Post post) => user.ID == userId && post.ID == postId)
                                    .Delete("rel")
                                    .ExecuteWithoutResultsAsync();
        }

        return new ServiceResult<bool> { Result = isLiked, StatusCode = ServiceStatusCode.Success };
    }
}
