using Backend.Models;
using Neo4jClient;

namespace Backend.Services;
public interface ITopicService
{
    Task<List<Topic>> GetAll();
    Task<Topic?> Get(string id);
    Task<Topic> Create(Topic topic);
}
public class TopicService : ITopicService
{
    private readonly IGraphClient _client;
    public TopicService(IGraphClient client)
    {
        _client = client;
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

    public async Task<Topic> Create(Topic topic)
    {
        topic.ID = Guid.NewGuid().ToString();
        topic.DatePublished = DateTime.Now;

        var newTopic = await _client.Cypher.Create("(t: Topic $topic)")
                                .WithParam("topic", topic)
                                .Return(t => t.As<Topic>()).ResultsAsync;

        return newTopic.Single();
    }
}
