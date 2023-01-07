using Redis.OM.Modeling;
namespace Backend.Models;


class ChatMessage
{
    [RedisIdField][Indexed] public string ID { get; set; } = String.Empty;
    public string FromID { get; set; } = String.Empty;
    public string Message { get; set; } = String.Empty;
    public DateTime TimeSent { get; set; }
}