using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Attributes;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    [Route("{postId}/{page}")]
    [HttpGet]
    public async Task<IActionResult> GetPostComments(string postId, int page)
    {
        var comments = await _commentService.GetPostComments(postId, page);
        return Ok(comments);
    }

    [Route("")]
    [HttpPost]
    public async Task<IActionResult> PostComment([FromBody] CommentCreateDto comment)
    {
        var authorId = (string?)HttpContext.Items["UserID"]!;

        var result = await _commentService.AddComment(comment, authorId);

        if (result.StatusCode != ServiceStatusCode.Success)
        {
            return BadRequest();
        }

        return Ok(result.Result);
    }

    [Route("")]
    [HttpPut]
    public async Task<IActionResult> UpdateComment([FromBody] CommentUpdateDto comment)
    {
        var userId = (string?)HttpContext.Items["UserID"]!;

        var result = await _commentService.UpdateComment(comment, userId);

        if (result.StatusCode != ServiceStatusCode.Success)
        {
            return BadRequest();
        }

        return Ok(result.Result);
    }
}