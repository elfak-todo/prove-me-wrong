namespace Backend.Models;

public class PostFeedData
{
    public Post? Post { get; set; }
    public bool Liked { get; set; } = false;
    public int LikeCount { get; set; } = 0;
    public int CommentCount { get; set; } = 0;
    public User? Author { get; set; }
}