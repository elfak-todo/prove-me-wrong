namespace Backend.Models;

public class Post {
    public string? ID { get; set; }
    public string? Text { get; set; }
    public DateTime DatePublished { get; set; }
    public int LikeCount { get; set; }
}