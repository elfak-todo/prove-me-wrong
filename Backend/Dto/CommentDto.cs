namespace Backend.Models;

public class CommentDto
{
    public string? ID { get; set; }
    public User? Author { get; set; }
    public string Text { get; set; } = string.Empty;
    public DateTime PublicationTime { get; set; }
    public int LikeCount { get; set; } = 0;
}