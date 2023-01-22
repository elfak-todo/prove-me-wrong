import { useContext, useEffect } from 'react';
import { baseURL } from '../../config';
import * as signalR from '@microsoft/signalr';
import UserContext from '../userManager/UserManager';

import './Chat.css';
import ChatForm from '../chatForm/ChatForm';
import ChatMessageList from '../chatMessageList/ChatMessageList';

const Chat = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const url = baseURL + '/ChatHub';

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        headers: {
          Authorization: 'Bearer ' + user?.accessToken,
        },
        withCredentials: true,
      })
      .build();

    // connection.on('Test', (data) => {
    //   console.log(data);
    // });

    connection.start().then(() => connection.invoke('Test', 'user1', 'Hello'));

    return () => {
      connection.stop();
    };
  }, [user]);

  return (
    <div className="chat-container">
      <h2>Ćaskanje</h2>
      <ChatMessageList />
      <ChatForm />
    </div>
  );
};

export default Chat;
