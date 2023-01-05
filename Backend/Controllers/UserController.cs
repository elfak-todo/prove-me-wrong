using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
using Backend.Attributes;
using Neo4jClient;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IGraphClient _client;
    public UserController(IGraphClient client, IUserService userService)
    {
        _client = client;
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] User user)
    {
        Console.WriteLine(HttpContext.Items["UserID"]);

        return Ok(await _userService.CreateUser(user));
    }

    [AllowAnonymous]
    [HttpPost("/login")]
    public async Task<IActionResult> Login([FromBody] UserLoginCreds user)
    {
        UserDetails? userDetails = await _userService.Login(user);
        return Ok(userDetails);
    }
}
