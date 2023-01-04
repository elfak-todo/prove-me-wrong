using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
         _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] User user)
    {
        return Ok(await _userService.CreateUser(user));
    }
}
