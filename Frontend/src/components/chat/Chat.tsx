import { useContext, useEffect, useState } from 'react';
import { baseURL } from '../../config';
import * as signalR from '@microsoft/signalr';
import UserContext from '../userManager/UserManager';

import './Chat.css';
import ChatForm from '../chatForm/ChatForm';
import ChatMessageList from '../chatMessageList/ChatMessageList';
import { ChatMessage } from '../../models/chat-message';
import UserDto from '../../models/user.dto';

const Chat = () => {
  const { user } = useContext(UserContext);

   const author: UserDto = {
     id: 'kdfijgipfskdsok',
     firstName: 'Luka',
     lastName: 'Kocić',
     username: 'luka',
   };

   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
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
   ]);

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
      <ChatMessageList
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        />
        <ChatForm setChatMessages={setChatMessages} />
    </div>
  );
};

export default Chat;
