import { FC } from 'react';
import { ChatMessage } from '../../models/chat-message';
import ChatMessageBubble from '../chatMessage/ChatMessageBubble';
import './ChatMessageList.css';

interface Props {
  chatMessages: ChatMessage[];
}

const ChatMessageList: FC<Props> = ({ chatMessages }) => {
  return (
    <div className="chat-message-list">
      {chatMessages.map((m) => (
        <ChatMessageBubble key={m.id} message={m} />
      ))}
    </div>
  );
};

export default ChatMessageList;