using Redis.OM.Modeling;

namespace Backend.Models;

[Document(StorageType = StorageType.Hash, Prefixes = new[] { "session" })]
public class Session
{
    [RedisIdField][Indexed] public string? AccessToken { get; set; }

    [Indexed] public int? UserID { get; set; }
}