using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Attributes;
using Backend.Models;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class TagController : ControllerBase
{
    private readonly ITagService _tagService;
    public TagController(ITagService tagService)
    {
        _tagService = tagService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _tagService.GetAll());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Tag tagData)
    {
        return Ok(await _tagService.Create(tagData));
    }
}