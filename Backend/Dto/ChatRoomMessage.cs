using System.Text.Json.Serialization;

namespace Backend.Models;

public class ChatRoomMessage
{
    [JsonPropertyName("id")]
    public string? ID { get; set; }

    [JsonPropertyName("from")]
    public User? From { get; set; }

    [JsonPropertyName("date")]
    public long Date { get; set; }

    [JsonPropertyName("message")]
    public string Message { get; set; } = string.Empty;

    [JsonPropertyName("roomId")]
    public string RoomId { get; set; } = string.Empty;
}