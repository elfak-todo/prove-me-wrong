import { useContext, useEffect, useState } from 'react';
import UserContext from '../userManager/UserManager';

import './Chat.css';
import ChatForm from '../chatForm/ChatForm';
import ChatMessageList from '../chatMessageList/ChatMessageList';
import { ChatMessage } from '../../models/chat-message';
import { useLocation } from 'react-router';
import { ITopic } from '../../models/topic';
import useChat from '../../hooks/use-chat';
import { ChatMessageDto } from '../../models/chat-message.dto';

const Chat = () => {
    const { state } = useLocation();
    const topic: ITopic = state;

    const { user } = useContext(UserContext);

   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

   const onReceiveMessage = (message: ChatMessageDto) => {
     if (topic.id === message.roomId) {
       const msg: ChatMessage = {
         ...message,
         myMessage: message.from.id === user?.id,
       };
       setChatMessages((state) => {
         if (state.some((m) => m.id === msg.id)) {
           return state;
         }
         return [msg, ...state];
       });
     }
   };

  useEffect(() => {
    return disconnect;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    const { sendMessage, disconnect } = useChat(onReceiveMessage);

  return (
    <div className="chat-container">
      <h2>Ćaskanje</h2>
      <ChatMessageList chatMessages={chatMessages} />
      <ChatForm sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
