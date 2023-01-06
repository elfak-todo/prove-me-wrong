import { ITopic } from "./topic";
import User from "./user";

export default interface TopicFeedData {
    topic: ITopic;
    author: User;
}