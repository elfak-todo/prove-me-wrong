using Backend.Models;
using Neo4jClient;

namespace Backend.Services;
public interface ITopicService
{
    Task<List<TopicFeedData>> GetAll();
    Task<List<TopicFeedData>> GetByUserInterests(string userId);
    Task<List<TopicFeedData>> GetByTag(string tagId);
    Task<List<TopicFeedData>> GetByUser(string userId);
    Task<ServiceResult<TopicFeedData>> Create(string authorId, Topic topicData);
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

    public async Task<List<TopicFeedData>> GetAll()
    {
        var topics = await _client.Cypher
                            .Match("(topic:Topic)-[:CREATED_BY]->(user:User)")
                            .OptionalMatch("(topic)-[:TAGGED_BY]->(tag:Tag)")
                            .Return((topic, user, tag) => new
                            {
                                Topic = topic.As<Topic>(),
                                Author = user.As<User>(),
                                Tag = tag.CollectAs<Tag>()
                            })
                            .ResultsAsync;

        return topics.Select(t => new TopicFeedData
        {
            Topic = t.Topic,
            Author = t.Author,
            Tags = t.Tag.ToList()
        }).ToList();
    }

    public async Task<List<TopicFeedData>> GetByUserInterests(string userId)
    {
        var topics = await _client.Cypher.Match("(user:User)-[:INTERESTED_IN]->(tag:Tag)<-[:TAGGED_BY]-(topic:Topic)-[:CREATED_BY]->(author:User)")
                                .Where((User user) => user.ID == userId)
                                .Return(((author, topic, tag) => new
                                {
                                    Topic = topic.As<Topic>(),
                                    Author = author.As<User>(),
                                    Tag = tag.CollectAs<Tag>()
                                })).ResultsAsync;

        return topics.Select(t => new TopicFeedData
        {
            Topic = t.Topic,
            Author = t.Author,
            Tags = t.Tag.ToList()
        }).ToList();
    }

    public async Task<List<TopicFeedData>> GetByTag(string tagId)
    {
        var topics = await _client.Cypher.Match("(tag:Tag)<-[:TAGGED_BY]-(topic:Topic)-[:CREATED_BY]->(author:User)")
                        .Where((Tag tag) => tag.ID == tagId)
                        .Return(((author, topic, tag) => new
                        {
                            Topic = topic.As<Topic>(),
                            Author = author.As<User>(),
                            Tag = tag.CollectAs<Tag>()
                        })).ResultsAsync;

        return topics.Select(t => new TopicFeedData
        {
            Topic = t.Topic,
            Author = t.Author,
            Tags = t.Tag.ToList()
        }).ToList();
    }

    public async Task<List<TopicFeedData>> GetByUser(string userId)
    {
        var topics = await _client.Cypher.Match("(topic:Topic)-[:CREATED_BY]->(user:User)")
                                .Where((User user) => user.ID == userId)
                                .OptionalMatch("(topic)-[:TAGGED_BY]->(tag:Tag)")
                                .Return((topic, user, tag) => new
                                {
                                    Topic = topic.As<Topic>(),
                                    Author = user.As<User>(),
                                    Tag = tag.CollectAs<Tag>()
                                }).ResultsAsync;

        return topics.Select(t => new TopicFeedData
        {
            Topic = t.Topic,
            Author = t.Author,
            Tags = t.Tag.ToList()
        }).ToList();
    }

    public async Task<ServiceResult<TopicFeedData>> Create(string authorId, Topic topicData)
    {
        var author = await _userService.GetById(authorId);

        if (author.Result == null)
            return new ServiceResult<TopicFeedData> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "InvalidUser" };


        topicData.ID = Guid.NewGuid().ToString();
        topicData.DatePublished = DateTime.Now;

        var newTopic = await _client.Cypher.Match("(user:User)")
                                    .Where((User user) => user.ID == authorId)
                                    .Create("(topic:Topic $topicData)-[:CREATED_BY]->(user)")
                                    .WithParam("topicData", new
                                    {
                                        ID = topicData.ID,
                                        Title = topicData.Title,
                                        Description = topicData.Description,
                                        DatePublished = topicData.DatePublished,
                                    })
                                    .Return((topic, user) => new TopicFeedData
                                    {
                                        Topic = topic.As<Topic>(),
                                        Author = user.As<User>()
                                    }).ResultsAsync;

        foreach (Tag t in topicData.Tags!)
        {
            await _client.Cypher.Match("(topic:Topic), (tag:Tag)")
                                    .Where((Topic topic) => topic.ID == topicData.ID)
                                    .AndWhere((Tag tag) => tag.ID == t.ID)
                                    .Create("(topic)-[:TAGGED_BY]->(tag)")
                                    .ExecuteWithoutResultsAsync();
        }

        return new ServiceResult<TopicFeedData> { Result = newTopic.Single(), StatusCode = ServiceStatusCode.Success };
    }
}
