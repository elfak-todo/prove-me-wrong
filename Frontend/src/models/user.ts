import UserDto from './user.dto';

export default interface User extends UserDto {
  accessToken: string;
}