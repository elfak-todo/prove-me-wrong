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

    [Route("{postId}/{page}/{sortType}")]
    [HttpGet]
    public async Task<IActionResult> GetPostComments(string postId, int page, string sortType)
    {
        var result = await _commentService.GetPostComments(postId, page, sortType);

        if (result.StatusCode != ServiceStatusCode.Success)
        {
            return BadRequest(result.ErrorMessage);
        }

        return Ok(result.Result);
    }

    [Route("")]
    [HttpPost]
    public async Task<IActionResult> PostComment([FromBody] CommentCreateDto comment)
    {
        var authorId = (string?)HttpContext.Items["UserID"]!;

        var result = await _commentService.AddComment(comment, authorId);

        if (result.StatusCode != ServiceStatusCode.Success)
        {
            return BadRequest(result.ErrorMessage);
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
            return BadRequest(result.ErrorMessage);
        }

        return Ok(result.Result);
    }

    [Route("{postId}/{commentId}/set-liked/{liked}")]
    [HttpPut]
    public async Task<IActionResult> SetCommentLiked(string postId, string commentId, bool liked)
    {
        var userId = (string?)HttpContext.Items["UserID"]!;

        var result = await _commentService.SetLiked(commentId, postId, userId, liked);

        if (result.StatusCode != ServiceStatusCode.Success)
        {
            return BadRequest(result.ErrorMessage);
        }

        return Ok(result.Result);
    }

    [Route("{postId}/{commentId}")]
    [HttpDelete]
    public async Task<IActionResult> DeleteComment(string postId, string commentId)
    {
        var userId = (string?)HttpContext.Items["UserID"]!;

        var result = await _commentService.DeleteComment(commentId, postId, userId);

        if (result.StatusCode != ServiceStatusCode.Success)
        {
            return BadRequest(result.ErrorMessage);
        }

        return Ok(result.Result);
    }
}