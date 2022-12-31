using Neo4j.Driver;
using Redis.OM.Searching;
using Redis.OM;

namespace Backend.Services;

public interface IUserService
{
    IEnumerable<Object>? CreateTestNode(string name);
}

public class UserService : IUserService
{
    private readonly IDriver _driver;
    private readonly RedisCollection<Models.Person> _people;
    private readonly RedisConnectionProvider _provider;

    public UserService(IDriver driver, RedisConnectionProvider provider)
    {
        _driver = driver;
        _provider = provider;
        _people = (RedisCollection<Models.Person>)provider.RedisCollection<Models.Person>();
    }

    public IEnumerable<Object>? CreateTestNode(string message)
    {
        using var session = _driver.Session();
        var greeting = session.ExecuteWrite(tx =>
        {
            var result = tx.Run("CREATE (a:Greeting) " +
                                "SET a.message = $message " +
                                "RETURN a.message + ', from node ' + id(a)",
                new { message });
            return result.Single()[0].As<string>();
        });
        Console.WriteLine(greeting);
        return null;
    }
}