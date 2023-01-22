using System.Text.Json;
using Backend.Models;
using StackExchange.Redis;

namespace Backend.Services;

public interface IChatService
{
    Task SendMessage(ChatRoomMessage message);
}
public class ChatService : IChatService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly IDatabase _redisDb;

    public ChatService(IConnectionMultiplexer redis)
    {
        _redis = redis;
        _redisDb = redis.GetDatabase();
    }

    public async Task SendMessage(ChatRoomMessage message)
    {
        var messageId = Guid.NewGuid().ToString();
        message.ID = messageId;

        var roomKey = $"room:{message.RoomId}";

        var jsonMessage = JsonSerializer.Serialize<ChatRoomMessage>(message);

        await _redisDb.SortedSetAddAsync(roomKey, jsonMessage, (double)message.Date);
        await PublishMessage("message", message);
    }

    private async Task PublishMessage(string type, ChatRoomMessage data)
    {
        var jsonData = JsonSerializer.Serialize<ChatRoomMessage>(data);

        var pubSubMessage = new PubSubMessage()
        {
            Type = type,
            Data = jsonData
        };

        await PublishMessage(pubSubMessage);
    }

    private async Task PublishMessage(PubSubMessage pubSubMessage)
    {
        await _redisDb.PublishAsync("MESSAGES", JsonSerializer.Serialize<PubSubMessage>(pubSubMessage));
    }
}