namespace Backend.Models;

public class Comment
{
    public string ID { get; set; } = string.Empty;
    public string AuthorId { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public DateTime PublicationTime { get; set; }
}