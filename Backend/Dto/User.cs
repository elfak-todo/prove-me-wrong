using System.Text.Json.Serialization;

namespace Backend.Models;

public class User
{
    [JsonPropertyName("id")]
    public string ID { get; set; } = String.Empty;

    [JsonPropertyName("username")]
    public string Username { get; set; } = String.Empty;

    [JsonPropertyName("firstName")]
    public string FirstName { get; set; } = String.Empty;

    [JsonPropertyName("lastName")]
    public string LastName { get; set; } = String.Empty;
}
