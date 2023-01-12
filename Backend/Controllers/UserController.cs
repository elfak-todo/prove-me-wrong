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

    [Route("friendRequest/getAll")]
    [HttpGet]
    public async Task<IActionResult> GetFriendRequests()
    {
        return Ok(await _userService.GetFriendRequests((string?)HttpContext.Items["UserID"]!));
    }

    [Route("friendRequest/send/{friendId}")]
    [HttpPost]
    public async Task<IActionResult> AddFriend(string friendId)
    {
        var res = await _userService.AddFriend((string?)HttpContext.Items["UserID"]!, friendId);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok();
    }

    [Route("friendRequest/respond/{friendId}")]
    [HttpPut]
    public async Task<IActionResult> RespondToFriendRequest([FromBody] bool accept, string friendId)
    {
        var res = await _userService.RespondToFriendRequest((string?)HttpContext.Items["UserID"]!, friendId, accept);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok();
    }

    [Route("interests")]
    [HttpPost]
    public async Task<IActionResult> SetInterests([FromBody] Tag[] tags)
    {
        var res = await _userService.SetInterests((string?)HttpContext.Items["UserID"]!, tags);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.StatusCode);
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