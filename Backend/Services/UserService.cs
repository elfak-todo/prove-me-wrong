using Redis.OM.Searching;
using Redis.OM;
using Neo4jClient;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Services;

public interface IUserService
{
    Task<ServiceResult<User>> GetById(string id);
    Task<UserProfileData> GetProfile(string viewerId, string id);
    Task<ServiceResult<bool>> AddFriend(string userId, string friendId);
    Task<ServiceResult<bool>> AcceptFriend(string userId, string friendId);
    Task<ServiceResult<bool>> Register(UserRegisterData regData);
    Task<ServiceResult<UserDetails>> Login(UserLoginCreds user);
    string? ValidateToken(string token);
}

public class UserService : IUserService
{
    private readonly IGraphClient _client;
    private readonly RedisCollection<Session> _sessions;
    private readonly RedisConnectionProvider _provider;
    private readonly IPasswordManager _passwordManager;

    public UserService(IGraphClient client,
                        RedisConnectionProvider provider,
                        IPasswordManager passwordManager)
    {
        _client = client;
        _provider = provider;
        _passwordManager = passwordManager;
        _sessions = (RedisCollection<Session>)provider.RedisCollection<Session>();
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
                ErrorMessage = "StudentNotFound"
            };

        return new ServiceResult<User>
        {
            Result = user,
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<UserProfileData> GetProfile(string viewerId, string id)
    {
        var query = await _client.Cypher.OptionalMatch("(t:Topic)-[:CREATED_BY]-(user:User)")
                                .Where((User user) => user.ID == id)
                                .With("user, COUNT(t) AS topicCount")
                                .OptionalMatch("(p:Post)-[:POSTED_BY]-(user)")
                                .With("user, topicCount, COUNT(p) AS postCount")
                                .OptionalMatch("(viewer:User)-[r:FRIENDS]-(user)")
                                .Where((User viewer) => viewer.ID == viewerId)
                                .With("user, topicCount, postCount, CASE WHEN r IS NOT NULL THEN true ELSE false END AS isFriend")
                                .OptionalMatch("(viewer)-[r1:SENT_REQUEST]->(user)")
                                .With("user, topicCount, postCount, isFriend, CASE WHEN r1 IS NOT NULL THEN true ELSE false END AS sentRequest")
                                .OptionalMatch("(viewer:User)<-[r2:SENT_REQUEST]-(user)")
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

        return query.Select(q => new UserProfileData
        {
            User = q.User,
            TopicCount = q.TopicCount,
            PostCount = q.PostCount,
            Friends = q.Friends,
            SentRequest = q.SentRequest,
            ReceivedRequest = q.ReceivedRequest,
            FriendList = q.FriendList.ToList()
        }).Single();
    }

    public async Task<ServiceResult<bool>> AddFriend(string userId, string friendId)
    {
        var res = await GetById(friendId);

        if (res.Result == null)
            return new ServiceResult<bool> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "FriendNotFoun" };

        await _client.Cypher.Match("(user:User), (friend:User)")
                        .Where((User user, User friend) => user.ID == userId && friend.ID == friendId)
                        .Create("(user)-[:SENT_REQUEST]->(friend)")
                        .ExecuteWithoutResultsAsync();

        return new ServiceResult<bool> { Result = true, StatusCode = ServiceStatusCode.Success };

    }

    public async Task<ServiceResult<bool>> AcceptFriend(string userId, string friendId)
    {
        var res = await GetById(friendId);

        if (res.Result == null)
            return new ServiceResult<bool> { StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "FriendNotFoun" };

        await _client.Cypher
                .Match("(user:User)<-[req:SENT_REQUEST]-(friend:User)")
                .Where((User user, User friend) => user.ID == userId && friend.ID == friendId)
                .Create("(user)<-[:FRIENDS]-(friend)")
                .Delete("req")
                .ExecuteWithoutResultsAsync();

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

        _sessions.Insert(new Session { UserID = authUser.ID, AccessToken = AccessToken });
        _provider.Connection.Execute("EXPIRE", "session:" + AccessToken, "3600");

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

    public string? ValidateToken(string token)
    {
        Session? s = _sessions.FindById(token);
        if (s == null)
        {
            return null;
        }
        return s.UserID;
    }
}