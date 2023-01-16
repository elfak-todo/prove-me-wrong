using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Attributes;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class TopicController : ControllerBase
{
    private readonly ITopicService _topicService;
    public TopicController(ITopicService topicService)
    {
        _topicService = topicService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _topicService.GetAll());
    }

    [Route("byUserInterests")]
    [HttpGet]
    public async Task<IActionResult> GetByUserInterests()
    {
        return Ok(await _topicService.GetByUserInterests((string?)HttpContext.Items["UserID"]!));
    }

    [Route("byTag/{tagId}")]
    [HttpGet]
    public async Task<IActionResult> GetByTag(string tagId)
    {
        return Ok(await _topicService.GetByTag(tagId));
    }

    [Route("userTopics/{userId}")]
    [HttpGet]
    public async Task<IActionResult> GetByUser(string userId)
    {
        return Ok(await _topicService.GetByUser(userId));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Topic topic)
    {
        var res = await _topicService.Create((string?)HttpContext.Items["UserID"]!, topic);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }
}