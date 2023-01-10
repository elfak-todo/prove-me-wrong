import User from './user';

export default interface UserProfileData {
  user: User | null;
  topicCount: number;
  postCount: number;
}
