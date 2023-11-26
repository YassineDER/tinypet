import { Petition } from "./petition";

export interface User {
    id: string;
    name: string;
    image: string;
    email: string;
    registeredDate: Date;
    signedPetitions: Petition[];
    createdPetitions: Petition[];
}
