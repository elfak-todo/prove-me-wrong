namespace Backend.Models;

public class UserDetails
{
    public int ID { get; set; } = -1;
    public string Username { get; set; } = String.Empty;
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string AccessToken { get; set; } = String.Empty;
}