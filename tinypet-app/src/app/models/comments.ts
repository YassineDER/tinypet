import { User } from "./user";

export interface Comments {
    id: number;
    author: User;
    content: string;
    createdDate: Date;
    likes: number;
}
