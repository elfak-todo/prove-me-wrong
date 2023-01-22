import { TextField } from '@mui/material';
import { FC, useContext, useRef } from 'react';
import { useLocation } from 'react-router';
import { ChatMessage } from '../../models/chat-message';
import { ChatMessageDto } from '../../models/chat-message.dto';
import { ITopic } from '../../models/topic';
import UserContext from '../userManager/UserManager';

import './ChatForm.css';

interface Props {
  sendMessage: (message: ChatMessageDto) => void;
}

const ChatForm: FC<Props> = ({ sendMessage }) => {
  const { user } = useContext(UserContext);

  const { state } = useLocation();
  const topic: ITopic = state;

  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const onSendMessage = () => {
    const msgText = textFieldRef.current?.value;
    if (!user || !msgText) return;

    const newMessage: ChatMessage = {
      from: user,
      message: msgText,
      myMessage: true,
      date: Date.now(),
      roomId: topic.id!,
    };

    sendMessage(newMessage);

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
