import { Comments } from "./comments";
import { Tag } from "./tag";
import { User } from "./user";

export interface Petition {
    id: number;
    title: string;
    description: string;
    creationDate: Date;
    tags: Tag[];
    signatureCount: number;
    signatureGoal: number;
    author: User;
    comments: Comments[];
}
