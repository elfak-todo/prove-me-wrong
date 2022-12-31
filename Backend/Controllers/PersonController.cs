using Microsoft.AspNetCore.Mvc;
using Redis.OM.Searching;
using Redis.OM;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class Person : ControllerBase
{
    private readonly RedisCollection<Models.Person> _people;
    private readonly RedisConnectionProvider _provider;
    public Person(RedisConnectionProvider provider)
    {
        _provider = provider;
        _people = (RedisCollection<Models.Person>)provider.RedisCollection<Models.Person>();
    }

    [HttpPost]
    public async Task<Models.Person> AddPerson([FromBody] Models.Person person)
    {
        await _people.InsertAsync(person);
        return person;
    }

    [HttpGet("filterAge")]
    public IList<Models.Person> FilterByAge([FromQuery] int minAge, [FromQuery] int maxAge)
    {
        return _people.Where(x => x.Age >= minAge && x.Age <= maxAge).ToList();
    }

    [HttpGet("filterGeo")]
    public IList<Models.Person> FilterByGeo([FromQuery] double lon, [FromQuery] double lat, [FromQuery] double radius, [FromQuery] string unit)
    {
        return _people.GeoFilter(x => x.Address!.Location, lon, lat, radius, Enum.Parse<GeoLocDistanceUnit>(unit)).ToList();
    }

    [HttpGet("filterName")]
    public IList<Models.Person> FilterByName([FromQuery] string firstName, [FromQuery] string lastName)
    {
        return _people.Where(x => x.FirstName == firstName && x.LastName == lastName).ToList();
    }

    [HttpGet("postalCode")]
    public IList<Models.Person> FilterByPostalCode([FromQuery] string postalCode)
    {
        return _people.Where(x => x.Address!.PostalCode == postalCode).ToList();
    }

    [HttpGet("fullText")]
    public IList<Models.Person> FilterByPersonalStatement([FromQuery] string text)
    {
        return _people.Where(x => x.PersonalStatement == text).ToList();
    }

    [HttpGet("streetName")]
    public IList<Models.Person> FilterByStreetName([FromQuery] string streetName)
    {
        return _people.Where(x => x.Address!.StreetName == streetName).ToList();
    }

    [HttpGet("skill")]
    public IList<Models.Person> FilterBySkill([FromQuery] string skill)
    {
        return _people.Where(x => x.Skills.Contains(skill)).ToList();
    }

    [HttpPatch("updateAge/{id}")]
    public IActionResult UpdateAge([FromRoute] string id, [FromBody] int newAge)
    {
        foreach (var person in _people.Where(x => x.Id == id))
        {
            person.Age = newAge;
        }
        _people.Save();
        return Accepted();
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePerson([FromRoute] string id)
    {
        _provider.Connection.Unlink($"Person:{id}");
        return NoContent();
    }
}

