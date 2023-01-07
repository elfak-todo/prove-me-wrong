import Tag from "./tag";
import User from "./user";

export interface ITopic {
    id?: string;
    title: string;
    description: string;
    datePublished?: Date;
    author?: User;
    tags?: Tag[]
}