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
    public async Task<ActionResult> GetAll()
    {
        return Ok(await _topicService.GetAll());
    }

    [Route("{id}")]
    [HttpGet]
    public async Task<ActionResult> Get(string id)
    {
        return Ok(await _topicService.Get(id));
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] Topic topic)
    {
        var res = await _topicService.Create((string?)HttpContext.Items["UserID"]!, topic);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }
}