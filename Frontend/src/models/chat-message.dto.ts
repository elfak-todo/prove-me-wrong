import UserDto from './user.dto';

export interface ChatMessageDto {
  from: UserDto;
  id?: string;
  message: string;
  date: number;
  roomId: string;
}
