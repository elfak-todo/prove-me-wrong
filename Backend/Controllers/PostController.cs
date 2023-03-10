using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Attributes;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;
    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [Route("{topicId}")]
    [HttpGet]
    public async Task<IActionResult> GetFeed(string topicId)
    {
        return Ok(await _postService.GetFeed((string?)HttpContext.Items["UserID"]!, topicId));
    }

    [Route("profileFeed/{userId}")]
    [HttpGet]
    public async Task<IActionResult> GetUserFeed(string userId)
    {
        return Ok(await _postService.GetUserFeed(userId));
    }

    [Route("{topicId}")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Post post, string topicId)
    {
        var res = await _postService.Create((string?)HttpContext.Items["UserID"]!, topicId, post);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [Route("edit/{postId}")]
    [HttpPut]
    public async Task<IActionResult> Edit([FromBody] string text, string postId)
    {
        var res = await _postService.Update(postId, text);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [Route("setLiked/{postId}")]
    [HttpPut]
    public async Task<IActionResult> SetLiked([FromBody] bool isLiked, string postId)
    {
        var res = await _postService.SetLiked((string?)HttpContext.Items["UserID"]!, postId, isLiked);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [Route("{id}")]
    [HttpDelete]
    public async Task<IActionResult> Delete(string id)
    {
        var res = await _postService.Delete(id);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }
}