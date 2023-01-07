namespace Backend.Models;

public class TopicChatMessage {
    public string ID { get; set; } = String.Empty;
    public string FromID { get; set; } = String.Empty;
    public string Message { get; set; } = String.Empty;
    public DateTime TimeSent { get; set; }
}