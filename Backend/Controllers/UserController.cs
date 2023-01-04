using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
using Neo4jClient;

namespace Backend.Controllers;

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
        return Ok(await _userService.CreateUser(user));
    }
}
