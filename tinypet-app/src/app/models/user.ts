import { Petition } from "./petition";

export interface User {
    id: string;
    name: string;
    image: string;
    email: string;
    signedPetitions: Petition[];
    createdPetitions: Petition[];
}
