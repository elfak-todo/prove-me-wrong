namespace Backend.Models;

public class Post {
    public string ID { get; set; } = String.Empty;
    public string Text { get; set; } = String.Empty;
    public DateTime DatePublished { get; set; }
    public int LikeCount { get; set; }
}