namespace Backend.Models;

public class Topic
{
    public string ID { get; set; } = String.Empty;
    public string Title { get; set; } = String.Empty;
    public string Description { get; set; } = String.Empty;
    public DateTime DatePublished { get; set; }
    public User? Author { get; set; }
}