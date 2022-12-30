using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{

    private readonly IDriver _driver;

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _driver = GraphDatabase.Driver("neo4j://localhost:7687", AuthTokens.Basic("neo4j", "neo4jneo4j"));
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<Object>? Get(string message)
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
