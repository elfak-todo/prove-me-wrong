using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
using Backend.Attributes;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        var res = await _userService.GetById(id);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [Route("profile/{id}")]
    [HttpGet]
    public async Task<IActionResult> GetProfile(string id)
    {
        return Ok(await _userService.GetProfile((string?)HttpContext.Items["UserID"]!, id));
    }

    [Route("friendRequest/{friendId}")]
    [HttpPost]
    public async Task<IActionResult> AddFriend(string friendId)
    {
        var res = await _userService.AddFriend((string?)HttpContext.Items["UserID"]!, friendId);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok();
    }

    [Route("acceptFriendRequest/{friendId}")]
    [HttpPatch]
    public async Task<IActionResult> AcceptFriend(string friendId)
    {
        var res = await _userService.AcceptFriend((string?)HttpContext.Items["UserID"]!, friendId);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok();
    }

    [AllowAnonymous]
    [Route("register")]
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] UserRegisterData regData)
    {
        var res = await _userService.Register(regData);

        if (!res.Result)
            return BadRequest(res.ErrorMessage);

        return Ok();
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginCreds user)
    {
        var res = await _userService.Login(user);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

}