import UserDto from './user.dto';

export interface ChatMessageDto {
  id: string;
  author: UserDto;
  text: string;
  timeSent: any;
}
