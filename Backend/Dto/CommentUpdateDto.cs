namespace Backend.Models;

public class CommentUpdateDto
{
    public string Text { get; set; } = string.Empty;
    public string? CommentId { get; set; }
}