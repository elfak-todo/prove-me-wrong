namespace Backend.Models;

public class CommentCreateDto
{
    public string Text { get; set; } = string.Empty;
    public string? PostId { get; set; }
}