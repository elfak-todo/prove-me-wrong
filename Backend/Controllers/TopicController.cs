using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

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
        return Ok(await _topicService.Create(topic));
    }
}