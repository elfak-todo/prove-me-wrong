import { FC } from 'react';
import { ChatMessage } from '../../models/chat-message';
import UserAvatar from '../avatar/UserAvatar';
import './ChatMessageBubble.css';

interface Props {
  message: ChatMessage;
}

const ChatMessageBubble: FC<Props> = ({ message }) => {
  return (
    <div
      className={`chat-message-bubble ${
        message.myMessage ? 'my-message' : 'other-messages'
      }`}
    >
      <div className="chat-message-avatar">
        <UserAvatar
          name={`${message.from.firstName} ${message.from.lastName}`}
          size={24}
        />
      </div>
      <div>
        <div className="chat-message-author">
          {message.from.firstName} {message.from.lastName}
        </div>
        <div className="chat-message">{message.message}</div>
        <div className="chat-message-time">
          {new Date(message.date).getHours() +
            ':' +
            new Date(message.date).getMinutes()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
