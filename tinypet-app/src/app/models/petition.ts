import { Tag } from "./tag";

export interface Petition {
    id: number;
    title: string;
    image: string;
    description: string;
    creationDate: Date;
    tags: Tag[];
    signatureCount: number;
    signatureGoal: number;
    author: string;
}
