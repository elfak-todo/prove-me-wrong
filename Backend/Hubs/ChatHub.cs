using Microsoft.AspNetCore.SignalR;
using Backend.Models;
using Backend.Hubs.Clients;
namespace Backend.Hubs;
class ChatHub : Hub<IChatClient>
{
    public async Task SendMessage(ChatMessage message)
    {
        await Clients.All.RecieveMessage(message);
    }
}