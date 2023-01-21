using Microsoft.AspNetCore.SignalR;
using Backend.Attributes;
using Backend.Services;

namespace Backend.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly IUserService _userService;

    public ChatHub(IUserService userService)
    {
        _userService = userService;
    }

    public async Task Test(string userId, string message)
    {
        await Task.Run(() =>
        {
            Thread.Sleep(500);
            Console.WriteLine(userId + " - " + message);
        });
    }

    // public override async Task OnConnectedAsync()
    // {
    //     // var userId = (string?)Context.GetHttpContext()!.Items["UserID"]!;
    //     // Console.WriteLine("USER CONNECTED:" + userId);

    //     var httpContext = Context.GetHttpContext();
    //     //await httpContext.Session.LoadAsync();

    //     if (httpContext != null)
    //     {
    //         foreach (var s in httpContext.Request.Headers)
    //         {
    //             Console.WriteLine(s);
    //         }

    //         // try
    //         // {
    //         //     string? authHeader = httpContext!.Request.Headers["Authorization"];
    //         //     Console.WriteLine(authHeader);
    //         //     if (authHeader != null && authHeader.StartsWith("Bearer"))
    //         //     {
    //         //         string token = authHeader.Substring(7);
    //         //         httpContext.Items["UserID"] = await _userService.ValidateToken(token);

    //         //     }
    //         // }
    //         // catch (Exception) { }
    //     }
    //     else
    //     {
    //         Console.WriteLine("NEAAAAAAAAAAA");
    //     }






    //     // var userStr = httpContext.Session.GetString("user");
    //     // if (!string.IsNullOrEmpty(userStr))
    //     // {
    //     //     var user = JsonSerializer.Deserialize<UserDto>(userStr);

    //     //     await userService.OnStartSession(user);

    //     // }
    //     // else
    //     // {
    //     //     await OnDisconnectedAsync(new Exception("Not Authorized"));
    //     // }

    //     await base.OnConnectedAsync();
    // }

    // public override async Task OnDisconnectedAsync(Exception? exception)
    // {
    //     // var httpContext = Context.GetHttpContext();
    //     // await httpContext.Session.LoadAsync();
    //     // var userStr = httpContext.Session.GetString("user");
    //     // if (!string.IsNullOrEmpty(userStr))
    //     // {
    //     //     var user = JsonSerializer.Deserialize<UserDto>(userStr);

    //     //     await userService.OnStopSession(user);

    //     // }

    //     await base.OnDisconnectedAsync(exception);
    // }
}