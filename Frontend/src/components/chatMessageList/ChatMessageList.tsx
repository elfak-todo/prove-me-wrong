import { ChatMessage } from '../../models/chat-message';
import UserDto from '../../models/user.dto';
import ChatMessageBubble from '../chatMessage/ChatMessageBubble';
import './ChatMessageList.css';

const ChatMessageList = () => {
  const author: UserDto = {
    id: 'kdfijgipfskdsok',
    firstName: 'Luka',
    lastName: 'Kocić',
    username: 'luka',
  };

  const messages: ChatMessage[] = [
    {
      id: '1',
      author: author,
      text: 'LALALALALALLALALAL',
      timeSent: Date.now(),
      myMessage: true,
    },
    {
      id: '2',
      author: author,
      text: 'GBFSGFFDGBFBF',
      timeSent: Date.now(),
      myMessage: false,
    },
    {
      id: '3',
      author: author,
      text: 'IJFIJIFDIFJF',
      timeSent: Date.now(),
      myMessage: false,
    },
    {
      id: '4',
      author: author,
      text: 'JIFGJFIGFM',
      timeSent: Date.now(),
      myMessage: true,
    },
    {
      id: '5',
      author: author,
      text: 'JGIFMIKMFIGM',
      timeSent: Date.now(),
      myMessage: false,
    },
    {
      id: '6',
      author: author,
      text: 'IJFIJIFDIFJF',
      timeSent: Date.now(),
      myMessage: false,
    },
    {
      id: '7',
      author: author,
      text: 'JIFGJFIGFM',
      timeSent: Date.now(),
      myMessage: true,
    },
    {
      id: '8',
      author: author,
      text: 'JGIFMIKMFIGM DKFOKODFJK DFIPM DFM',
      timeSent: Date.now(),
      myMessage: false,
    },
  ];

  return (
    <div className="chat-message-list">
      {messages.map((m) => (
        <ChatMessageBubble key={m.id} message={m} />
      ))}
    </div>
  );
};

export default ChatMessageList;
