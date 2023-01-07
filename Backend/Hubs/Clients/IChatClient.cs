using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Hubs.Clients;
interface IChatClient
{
    Task RecieveMessage(ChatMessage message);
}
