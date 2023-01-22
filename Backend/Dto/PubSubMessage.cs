namespace Backend.Models;

public class PubSubMessage
{
    public string Type { get; set; } = "";
    public string Data { get; set; } = "";
    public string ServerId { get; set; } = "1";
}