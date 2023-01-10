using Backend.Models;
using Neo4jClient;

namespace Backend.Services;
public interface IPostService
{
    Task<List<PostFeedData>> GetFeed(string topicID);
    Task<List<PostFeedData>> GetUserFeed(string userId);
    Task<ServiceResult<PostFeedData>> Create(string authorID, string topicID, Post postData);
    Task<ServiceResult<Post>> Delete(string id);
}

public class PostService : IPostService
{
    private readonly IGraphClient _client;
    private readonly IUserService _userService;
    public PostService(IGraphClient client, IUserService userService)
    {
        _client = client;
        _userService = userService;
    }

    public async Task<List<PostFeedData>> GetFeed(string topicID)
    {
        var posts = await _client.Cypher.Match("(post:Post)-[:RELATED_TO]->(topic:Topic), (post:Post)-[:POSTED_BY]->(user:User)")
                                    .Where((Topic topic) => topic.ID == topicID)
                                    .Return((post, user) => new PostFeedData
                                    {
                                        Post = post.As<Post>(),
                                        Author = user.As<User>()
                                    }).ResultsAsync;

        return posts.ToList();
    }

    public async Task<List<PostFeedData>> GetUserFeed(string userId)
    {
        var posts = await _client.Cypher.Match("(post:Post)-[:POSTED_BY]->(user:User)")
                                    .Where((User user) => user.ID == userId)
                                    .Return((post, user) => new PostFeedData {
                                        Post = post.As<Post>(),
                                        Author = user.As<User>()
                                    }).ResultsAsync;
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

        return new ServiceResult<Post> { Result = post.FirstOrDefault(), StatusCode = ServiceStatusCode.Success };
    }
}
