import UserDto from './user.dto';

export interface CommentDto {
  id: string;
  author: UserDto;
  text: string;
  publicationTime: Date;
  likeCount: number;
  isLiked: boolean;
}
