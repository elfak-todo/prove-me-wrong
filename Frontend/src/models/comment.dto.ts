import UserDto from "./user.dto";

export interface CommentDto {
  ID: string,
  author: UserDto,
  text: string,
  publicationTime: string
}
