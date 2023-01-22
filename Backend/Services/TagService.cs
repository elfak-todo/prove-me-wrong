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
        var newTag = await _client.Cypher.Merge("(tag:Tag {Name: $tagData.Name})")
                                    .OnCreate()
                                        .Set("tag = $tagData")
                                        .Set("tag.ID = $tagId")
                                    .WithParams(new { tagData, tagId = Guid.NewGuid().ToString() })
                                    .Return(tag => tag.As<Tag>())
                                    .ResultsAsync;

        return newTag.Single();
    }

    public async void CreateDefaultAsync()
    {
        if(!_client.IsConnected) await _client.ConnectAsync();

        await Create(new Tag { Name = "Programiranje" });
        await Create(new Tag { Name = "Sport" });
        await Create(new Tag { Name = "Politika" });
        await Create(new Tag { Name = "Hrana" });
        await Create(new Tag { Name = "Nauka" });
        await Create(new Tag { Name = "Putovanja" }); 
        await Create(new Tag { Name = "Filmovi" }); 
        await Create(new Tag { Name = "Serije" });
        await Create(new Tag { Name = "Fakultet" });
    }
}