using Backend.Models;
using Neo4jClient;

namespace Backend.Services;
public interface IPostService
{
    Task<List<Post>> GetFeed(string topicID);
    Task<ServiceResult<Post>> Create(string topicID, Post postData);
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

    public async Task<List<Post>> GetFeed(string topicID)
    {
        var posts = await _client.Cypher.Match("(post:Post)-[:RELATED_TO]->(topic:Topic)")
                                    .Where((Topic topic) => topic.ID == topicID)
                                    .Return(post => post.As<Post>()).ResultsAsync;

        return posts.ToList();
    }

    public async Task<ServiceResult<Post>> Create(string topicID, Post postData)
    {
        postData.ID = Guid.NewGuid().ToString();
        postData.DatePublished = DateTime.Now;

        var topic = await _client.Cypher.Match("(topic:Topic)")
                                    .Where((Topic topic) => topic.ID == topicID)
                                    .Return(topic => topic.As<Topic>()).ResultsAsync;

        if (topic.SingleOrDefault() == null)
            return new ServiceResult<Post>
            {
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "TopicNotFound"
            };

        var newPost = await _client.Cypher.Match("(topic:Topic)")
                                    .Where((Topic topic) => topic.ID == topicID)
                                    .Create("(post:Post $postData)-[:RELATED_TO]->(topic)")
                                    .WithParam("postData", postData)
                                    .Return(post => post.As<Post>()).ResultsAsync;

        return new ServiceResult<Post>
        {
            Result = newPost.Single(),
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<ServiceResult<Post>> Delete(string id)
    {
        var post = await _client.Cypher.Match("(post:Post)")
                                    .Where((Post post) => post.ID == id)
                                    .Return(post => post.As<Post>()).ResultsAsync;

        if (post.FirstOrDefault() == null)
            return new ServiceResult<Post>
            {
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "PostNotFound"
            };

        await _client.Cypher.Match("(post:Post)")
                                    .Where((Post post) => post.ID == id)
                                    .DetachDelete("post").ExecuteWithoutResultsAsync();

        return new ServiceResult<Post>
        {
            Result = post.FirstOrDefault(),
            StatusCode = ServiceStatusCode.Success
        };
    }
}
