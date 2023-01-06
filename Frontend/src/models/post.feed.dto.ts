import Post from "./post";
import User from "./user";

export default interface PostFeedData {
    post: Post;
    author: User;
}