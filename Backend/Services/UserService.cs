using StackExchange.Redis;
using Neo4jClient;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services;

public interface IUserService
{
    Task<ServiceResult<User>> GetById(string id);
    Task<UserProfileData> GetProfile(string viewerId, string id);
    Task<List<User>> GetFriendRequests(string id);
    Task<ServiceResult<bool>> AddFriend(string userId, string friendId);
    Task<ServiceResult<bool>> RespondToFriendRequest(string userId, string friendId, bool accept);
    Task<ServiceResult<bool>> SetInterests(string userId, Tag[] tags);
    Task<ServiceResult<bool>> Register(UserRegisterData regData);
    Task<ServiceResult<UserDetails>> Login(UserLoginCreds user);
    Task<string?> ValidateToken(string token);
}

public class UserService : IUserService
{
    private readonly IGraphClient _client;
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _redisDb;
    private readonly IPasswordManager _passwordManager;

    public UserService(IGraphClient client,
                        IConnectionMultiplexer redis,
                        IPasswordManager passwordManager)
    {
        _client = client;
        _redis = redis;
        _redisDb = redis.GetDatabase();
        _passwordManager = passwordManager;
    }

    public async Task<ServiceResult<User>> GetById(string id)
    {
        var res = await _client.Cypher.Match("(user:User)")
                                    .Where((User user) => user.ID == id)
                                    .Return(user => user.As<User>()).ResultsAsync;

        var user = res.FirstOrDefault();

        if (user == null)
            return new ServiceResult<User>
            {
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "UserNotFound"
            };

        return new ServiceResult<User>
        {
            Result = user,
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<UserProfileData> GetProfile(string viewerId, string id)
    {
        var query = await _client.Cypher.Match("(user:User)")
                                .Where((User user) => user.ID == id)
                                .OptionalMatch("(t:Topic)-[:CREATED_BY]-(user)")
                                .With("user, COUNT(t) AS topicCount")
                                .OptionalMatch("(p:Post)-[:POSTED_BY]-(user)")
                                .With("user, topicCount, COUNT(p) AS postCount")
                                .OptionalMatch("(viewer:User)-[r:FRIENDS]-(user)")
                                .Where((User viewer) => viewer.ID == viewerId)
                                .With("user, topicCount, postCount, CASE WHEN r IS NOT NULL THEN true ELSE false END AS isFriend")
                                .OptionalMatch("(viewer)-[r1:SENT_REQUEST]->(user)")
                                .Where((User viewer) => viewer.ID == viewerId && viewer.ID != id)
                                .With("user, topicCount, postCount, isFriend, CASE WHEN r1 IS NOT NULL THEN true ELSE false END AS sentRequest")
                                .OptionalMatch("(viewer)<-[r2:SENT_REQUEST]-(user)")
                                .Where((User viewer) => viewer.ID == viewerId && viewer.ID != id)
                                .With("user, topicCount, postCount, isFriend, sentRequest, CASE WHEN r2 IS NOT NULL THEN true ELSE false END AS receivedRequest")
                                .OptionalMatch("(user)-[:FRIENDS]-(friend:User)")
                                .Return((user, topicCount, postCount, isFriend, sentRequest, receivedRequest, friend) => new
                                {
                                    User = user.As<User>(),
                                    TopicCount = topicCount.As<int>(),
                                    PostCount = postCount.As<int>(),
                                    Friends = isFriend.As<bool>(),
                                    SentRequest = sentRequest.As<bool>(),
                                    ReceivedRequest = receivedRequest.As<bool>(),
                                    FriendList = friend.CollectAs<User>()
                                }).ResultsAsync;

        var interestQuery = await _client.Cypher.Match("(user:User)-[INTERESTED_IN]->(interest:Tag)")
                                .Where((User user) => user.ID == id)
                                .Return(interest => interest.As<Tag>()).ResultsAsync;

        return query.Select(q => new UserProfileData
        {
            User = q.User,
            TopicCount = q.TopicCount,
            PostCount = q.PostCount,
            Friends = q.Friends,
            SentRequest = q.SentRequest,
            ReceivedRequest = q.ReceivedRequest,
            FriendList = q.FriendList.ToList(),
            Interests = interestQuery.ToList()
        }).Single();
    }

    public async Task<List<User>> GetFriendRequests(string id)
    {
        var res = await _client.Cypher.Match("(user:User)<-[:SENT_REQUEST]-(friend:User)")
                                .Where((User user) => user.ID == id)
                                .Return(friend => friend.As<User>()).ResultsAsync;

        return res.ToList();
    }

    public async Task<ServiceResult<bool>> AddFriend(string userId, string friendId)
    {
        var res = await GetById(friendId);

        if (res.Result == null)
            return new ServiceResult<bool> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "FriendNotFound" };

        await _client.Cypher.Match("(user:User), (friend:User)")
                        .Where((User user, User friend) => user.ID == userId && friend.ID == friendId)
                        .Create("(user)-[:SENT_REQUEST]->(friend)")
                        .ExecuteWithoutResultsAsync();

        return new ServiceResult<bool> { Result = true, StatusCode = ServiceStatusCode.Success };

    }

    public async Task<ServiceResult<bool>> RespondToFriendRequest(string userId, string friendId, bool accept)
    {
        var res = await GetById(friendId);

        if (res.Result == null)
            return new ServiceResult<bool> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "FriendNotFound" };

        if (!accept)
        {
            await _client.Cypher.Match("(user:User)<-[req:SENT_REQUEST]-(friend:User)")
                        .Where((User user, User friend) => user.ID == userId && friend.ID == friendId)
                        .Delete("req")
                        .ExecuteWithoutResultsAsync();
        }
        else
        {
            await _client.Cypher.Match("(user:User)<-[req:SENT_REQUEST]-(friend:User)")
                        .Where((User user, User friend) => user.ID == userId && friend.ID == friendId)
                        .Create("(user)<-[:FRIENDS]-(friend)")
                        .Delete("req")
                        .ExecuteWithoutResultsAsync();
        }

        return new ServiceResult<bool> { Result = true, StatusCode = ServiceStatusCode.Success };

    }

    public async Task<ServiceResult<bool>> SetInterests(string userId, Tag[] tags)
    {
        await _client.Cypher.Match("(user:User)-[rel:INTERESTED_IN]->(interest:Tag)")
                                .Where((User user) => user.ID == userId)
                                .Delete("rel").ExecuteWithoutResultsAsync();

        foreach (Tag t in tags)
        {
            await _client.Cypher.Match("(user:User), (tag:Tag)")
                                    .Where((User user) => user.ID == userId)
                                    .AndWhere((Tag tag) => tag.ID == t.ID)
                                    .Create("(user)-[:INTERESTED_IN]->(tag)")
                                    .ExecuteWithoutResultsAsync();
        }

        return new ServiceResult<bool> { Result = true, StatusCode = ServiceStatusCode.Success };
    }

    public async Task<ServiceResult<bool>> Register(UserRegisterData regData)
    {
        var user = await _client.Cypher.Match("(user:User)")
                                    .Where((User user) => user.Username == regData.Username)
                                    .Return(user => user.As<User>()).ResultsAsync;

        if (user.FirstOrDefault() != null)
            return new ServiceResult<bool>
            {
                Result = false,
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "UsernameAlreadyExists"
            };

        regData.ID = Guid.NewGuid().ToString();
        regData.Password = _passwordManager.HashPassword(regData.Password);

        await _client.Cypher.Create("(user:User $data)")
                                    .WithParam("data", regData)
                                    .ExecuteWithoutResultsAsync();

        return new ServiceResult<bool>
        {
            Result = true,
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<ServiceResult<UserDetails>> Login(UserLoginCreds user)
    {
        var AccessToken = Guid.NewGuid().ToString();

        var res = await Authenticate(user.Username, user.Password);
        if (res.Result == null)
            return new ServiceResult<UserDetails>
            {
                StatusCode = res.StatusCode,
                ErrorMessage = res.ErrorMessage
            };

        User authUser = res.Result;

        string sessionId = "session:" + AccessToken;

        HashEntry[] entries = new HashEntry[2];
        entries[0] = new HashEntry("UserID", authUser.ID);
        entries[1] = new HashEntry("AccessToken", AccessToken);

        await _redisDb.HashSetAsync(sessionId, entries);
        await _redisDb.ExecuteAsync("EXPIRE", sessionId, "3600");

        return new ServiceResult<UserDetails>
        {
            Result = new UserDetails
            {
                ID = authUser.ID,
                Username = authUser.Username,
                FirstName = authUser.FirstName,
                LastName = authUser.LastName,
                AccessToken = AccessToken
            },
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<ServiceResult<User>> Authenticate(string username, string password)
    {
        if (username == null || password == null)
            return new ServiceResult<User>
            {
                StatusCode = ServiceStatusCode.FieldsMissing,
                ErrorMessage = "FieldsMissing"
            };

        var query = await _client.Cypher.Match("(user:User)")
                                    .Where((User user) => user.Username == username)
                                    .Return(user => user.As<UserRegisterData>()).ResultsAsync;

        var user = query.FirstOrDefault();

        if (user == null)
            return new ServiceResult<User>
            {
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "UserNotFound"
            };

        if (!_passwordManager.VerifyPassword(password, user.Password))
            return new ServiceResult<User>
            {
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "InvalidPassword"
            };

        return new ServiceResult<User>
        {
            Result = new User
            {
                ID = user.ID!,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName
            },
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<string?> ValidateToken(string token)
    {
        string sessionId = "session:" + token;
        string? userID = await _redisDb.HashGetAsync(sessionId, "UserID");
        return userID;
    }
}