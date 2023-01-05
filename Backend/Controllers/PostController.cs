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

    [Route("{topicID}")]
    [HttpGet]
    public async Task<ActionResult> GetFeed(string topicID)
    {
        return Ok(await _postService.GetFeed(topicID));
    }

    [Route("{topicID}")]
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] Post post, string topicID)
    {
        var res = await _postService.Create(topicID, post);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [Route("{id}")]
    [HttpDelete]
    public async Task<ActionResult> Delete(string id)
    {
        var res = await _postService.Delete(id);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }
}