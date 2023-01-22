import { ChatMessageDto } from './chat-message.dto';

export interface ChatMessage extends ChatMessageDto {
  myMessage: boolean;
}