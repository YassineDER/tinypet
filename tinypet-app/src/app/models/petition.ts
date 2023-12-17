import { Comment } from "./comments";
import { Tag } from "./tag";
import { User } from "./user";

export interface Petition {
    title: string;
    image: string;
    description: string;
    creationDate: Date;
    tags: Tag[];
    signatureCount: number;
    signatureGoal: number;
    author: User;
    comments: Comment[];
}
