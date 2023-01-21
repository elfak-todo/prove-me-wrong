import { TextField } from '@mui/material';
import { Dispatch, FC, SetStateAction, useContext, useRef } from 'react';
import { ChatMessage } from '../../models/chat-message';
import UserContext from '../userManager/UserManager';

import './ChatForm.css';

interface Props {
  setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;
}

const ChatForm: FC<Props> = ({ setChatMessages }) => {
  const { user } = useContext(UserContext);

  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const onSendMessage = () => {
    const msgText = textFieldRef.current?.value;
    if (!user || !msgText) return;

    const newMessage: ChatMessage = {
      id: 'sd',
      author: user,
      text: msgText,
      myMessage: true,
      timeSent: new Date(),
    };

    setChatMessages((state) => [newMessage, ...state]);

    textFieldRef.current.value = '';
  };

  return (
    <div className="chat-form">
      <TextField
        size="small"
        fullWidth
        placeholder="Napišite poruku"
        inputRef={textFieldRef}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            onSendMessage();
            ev.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default ChatForm;
