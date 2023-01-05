using Backend.Models;
using Neo4jClient;

namespace Backend.Services;

public interface ITagService
{
    Task<List<Tag>> GetAll();
    Task<Tag> Create(Tag tagData);
}

public class TagService : ITagService
{
    private readonly IGraphClient _client;
    public TagService(IGraphClient client)
    {
        _client = client;
    }

    public async Task<List<Tag>> GetAll()
    {
        var tags = await _client.Cypher.Match("(tag:Tag)")
                                    .Return(tag => tag.As<Tag>()).ResultsAsync;

        return tags.ToList();
    }

    public async Task<Tag> Create(Tag tagData)
    {
        tagData.ID = Guid.NewGuid().ToString();
        
        var newTag = await _client.Cypher.Create("(tag:Tag $tagData)")
                                    .WithParam("tagData", tagData)
                                    .Return(tag => tag.As<Tag>()).ResultsAsync;

        return newTag.Single();
    }
}