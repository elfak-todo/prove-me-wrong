using Backend.Models;
using Neo4jClient;

namespace Backend.Services;
public interface ITopicService
{
    Task<List<Topic>> GetAll();
    Task<Topic?> Get(string id);
    Task<ServiceResult<Topic>> Create(string authorID, Topic topicData);
}
public class TopicService : ITopicService
{
    private readonly IGraphClient _client;
    private readonly IUserService _userService;
    public TopicService(IGraphClient client, IUserService userService)
    {
        _client = client;
        _userService = userService;
    }

    public async Task<List<Topic>> GetAll()
    {
        var topics = await _client.Cypher.Match("(t: Topic)")
                                .Return(t => t.As<Topic>()).ResultsAsync;

        return topics.ToList();
    }

    public async Task<Topic?> Get(string id)
    {
        var topic = await _client.Cypher.Match("(t: Topic)")
                                .Where((Topic t) => t.ID == id)
                                .Return(t => t.As<Topic>()).ResultsAsync;

        return topic.SingleOrDefault();
    }

    public async Task<ServiceResult<Topic>> Create(string authorID, Topic topicData)
    {
        var author = await _userService.GetById(authorID);

        if (author.Result == null)
            return new ServiceResult<Topic> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "InvalidUser" };


        topicData.ID = Guid.NewGuid().ToString();
        topicData.DatePublished = DateTime.Now;

        var newTopic = await _client.Cypher.Match("(user:User)")
                                    .Where((User user) => user.ID == authorID)
                                    .Create("(topic:Topic $topicData)-[:CREATED_BY]->(user)")
                                    .WithParam("topicData", topicData)
                                    .Return(topic => topic.As<Topic>()).ResultsAsync;


        return new ServiceResult<Topic> { Result = newTopic.Single(), StatusCode = ServiceStatusCode.Success };
    }
}
