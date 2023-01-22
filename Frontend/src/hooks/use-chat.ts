import * as signalR from '@microsoft/signalr';
import { useRef } from 'react';
import { baseURL } from '../config';
import { ChatMessageDto } from '../models/chat-message.dto';

type MessageListener = (message: ChatMessageDto) => void;

const useChat = (messageListener: MessageListener) => {
  const url = baseURL + '/ChatHub';

  const connectionRef = useRef(
    new signalR.HubConnectionBuilder()
      .withUrl(url, {
        withCredentials: true,
      })
      .build()
  );

  const sendMessage = (message: ChatMessageDto) => {
    const messageString = JSON.stringify(message);
    connectionRef.current.invoke('SendMessage', messageString);
  };

  const disconnect = () => {
    if (connectionRef.current.state === 'Connected') {
      connectionRef.current.stop();
    }
  };

  if (connectionRef.current.state === 'Disconnected') {
    connectionRef.current.start();
  }

  connectionRef.current.on('message', (data) => {
    const message: ChatMessageDto = JSON.parse(data);
    messageListener(message);
  });

  return {
    sendMessage,
    disconnect,
  };
};

export default useChat;
