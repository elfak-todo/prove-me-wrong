using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Attributes;
using System.Net.WebSockets;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class  ChatController : ControllerBase
{
    // [Route("/ws")]
    // [ApiExplorerSettings(IgnoreApi = true)]
    // public async Task Get()
    // {
    //     if (HttpContext.WebSockets.IsWebSocketRequest)
    //     {
    //         using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
    //         await Echo(webSocket);
    //     }
    //     else
    //     {
    //         HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
    //     }
    // }

    // private static async Task Echo(WebSocket webSocket)
    // {
    //     var buffer = new byte [1024 * 4];
    //     var recieveResult = await webSocket.ReceiveAsync(
    //         new ArraySegment<byte>(buffer), CancellationToken.None);

    //     while (!recieveResult.CloseStatus.HasValue)
    //     {
    //         await webSocket.SendAsync(
    //             new ArraySegment<byte>(buffer, 0, recieveResult.Count),
    //             recieveResult.MessageType,
    //             recieveResult.EndOfMessage,
    //             CancellationToken.None);

    //         recieveResult = await webSocket.ReceiveAsync(
    //             new ArraySegment<byte>(buffer), CancellationToken.None);
    //     } 

    //     await webSocket.CloseAsync(
    //         recieveResult.CloseStatus.Value,
    //         recieveResult.CloseStatusDescription,
    //         CancellationToken.None);
    // }
}