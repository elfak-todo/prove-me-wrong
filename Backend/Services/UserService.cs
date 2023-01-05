using Redis.OM.Searching;
using Redis.OM;
using Neo4jClient;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services;

public interface IUserService
{
    Task<User?> CreateUser(User user);
    Task<UserDetails?> Login(UserLoginCreds user);
    int? ValidateToken(string token);
}

public class UserService : IUserService
{
    private readonly IGraphClient _client;
    private readonly RedisCollection<Session> _sessions;
    private readonly RedisConnectionProvider _provider;

    public UserService(IGraphClient client, RedisConnectionProvider provider)
    {
        _client = client;
        _provider = provider;
        _sessions = (RedisCollection<Session>)provider.RedisCollection<Session>();
    }

    public async Task<User?> CreateUser(User user)
    {
        await _client.Cypher.Create("(u:User $user)")
                    .WithParam("user", user)
                    .ExecuteWithoutResultsAsync();
        return null;
    }

    public async Task<UserDetails?> Login(UserLoginCreds user)
    {
        await Task.Delay(10);

        var AccessToken = Guid.NewGuid().ToString();

        _sessions.Insert(new Session { UserID = 10, AccessToken = AccessToken });
        _provider.Connection.Execute("EXPIRE", "session:" + AccessToken, "3600");

        return new UserDetails { ID = 10, Username = "luka", FirstName = "Luka", LastName = "Kocic", AccessToken = AccessToken };
    }

    public async Task<int?> Authenticate(string username, string password)
    {
        await Task.Delay(10);
        //TODO ADD PROPER AUTH - neo4j
        if (username != password)
        {
            return null;
        }
        return 5;
    }

    public int? ValidateToken(string token)
    {
        Session? s = _sessions.FindById(token);
        if (s == null)
        {
            return null;
        }
        return s.UserID;
    }
}