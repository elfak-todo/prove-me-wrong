using Redis.OM.Searching;
using Redis.OM;
using Neo4jClient;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services;

public interface IUserService
{
    Task<User?> CreateUser(User user);
}

public class UserService : IUserService
{
    private readonly IGraphClient _client;
    private readonly RedisCollection<Models.Person> _people;
    private readonly RedisConnectionProvider _provider;

    public UserService(IGraphClient client, RedisConnectionProvider provider)
    {
        _client = client;
        _provider = provider;
        _people = (RedisCollection<Models.Person>)provider.RedisCollection<Models.Person>();
    }

    public async Task<User?> CreateUser(User user)
    {
        await _client.Cypher.Create("(u:User $user)")
                    .WithParam("user", user)
                    .ExecuteWithoutResultsAsync();
        return null;
    }
}