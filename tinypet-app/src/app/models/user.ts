import { Petition } from "./petition";

export interface User {
    id: number;
    name: string;
    image: string;
    email: string;
    registeredDate: Date;
    signedPetitions: Petition[];
    createdPetitions: Petition[];
}
