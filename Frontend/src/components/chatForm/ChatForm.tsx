import { TextField } from '@mui/material';

import './ChatForm.css';

const ChatForm = () => {
  return (
    <div className="chat-form">
      <TextField fullWidth placeholder="Napišite poruku" />
    </div>
  );
};

export default ChatForm;
