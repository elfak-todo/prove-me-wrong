using Backend.Models;

public class UserProfileData
{
    public User? User { get; set; }
    public int TopicCount { get; set; } = 0;
    public int PostCount { get; set; } = 0;
    public bool Friends { get; set; } = false;
    public bool SentRequest { get; set; } = false;
    public bool ReceivedRequest { get; set; } = false;
    public List<User>? FriendList { get; set; }
}