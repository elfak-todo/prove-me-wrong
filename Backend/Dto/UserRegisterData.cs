namespace Backend.Models;

public class UserRegisterData
{
    public string? ID { get; set; }
    public string Username { get; set; } = String.Empty;
    public string Password { get; set; } = String.Empty;
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
}
