using Microsoft.AspNetCore.SignalR;
using Backend.Attributes;
using Backend.Services;
using System.Text.Json;
using Backend.Models;

namespace Backend.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly IUserService _userService;
    private readonly IChatService _chatService;

    public ChatHub(IUserService userService, IChatService chatService)
    {
        _userService = userService;
        _chatService = chatService;
    }

    public async Task SendMessage(string messageString)
    {
        var message = JsonSerializer.Deserialize<ChatRoomMessage>(messageString);

        if (message != null)
        {
            await _chatService.SendMessage(message);
        }
    }
}