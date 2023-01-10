using Backend.Models;

public class UserProfileData
{
    public User? User { get; set; }
    public int TopicCount { get; set; } = 0;
    public int PostCount { get; set; } = 0;
}