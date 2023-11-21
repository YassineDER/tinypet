import { User } from "./user";

export interface Comment {
    id: number;
    author: User;
    content: string;
    createdDate: Date;
    likes: number;
}
