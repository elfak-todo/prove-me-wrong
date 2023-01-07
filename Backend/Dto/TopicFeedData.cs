namespace Backend.Models;

public class TopicFeedData {
    public Topic? Topic { get; set; }
    public User? Author { get; set; }

    public List<Tag>? Tags { get; set; }
}