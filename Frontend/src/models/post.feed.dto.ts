import Post from './post';
import User from './user';

export default interface PostFeedData {
  post: Post;
  liked: boolean;
  likeCount: number;
  commentCount: number;
  author: User;
}
