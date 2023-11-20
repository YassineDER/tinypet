import { Petition } from "./petition";

export interface User {
    id: number;
    name: string;
    image: string;
    registeredDate: Date;
    email: string;
    password: string;
    signedPetitions: Petition[];
    createdPetitions: Petition[];
}
