namespace Backend.Models;
using System.Linq;
public class Room
{
    public string ID {get;set;} = String.Empty;
    public string TopicID { get; set; } = String.Empty;
    public IEnumerable<String> ParticipantsID {get; set;} = Enumerable.Empty<String>();
}