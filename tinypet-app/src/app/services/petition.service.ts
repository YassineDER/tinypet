import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PETITIONS} from 'src/assets/mocks/petitions.mock';
import {Petition} from '../models/petition';
import {HttpClient} from "@angular/common/http";
import {prod} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PetitionService {
    API = prod.URL + '/petitions/v1';

    constructor(private http: HttpClient) {}

    getMockPetitions(): Observable<Petition[]> {
        return of(PETITIONS);
    }

    createPetition(petition: Petition): Observable<Petition> {
        return this.http.post<Petition>(this.API + "/create", petition);
    }

    getPetitions(): Observable<Petition[]> {
        return this.http.get<Petition[]>(this.API + "/all?page=1");
    }

    convertEntityListToPetitions(entity: any): Petition[] {
        const petitions: Petition[] = [];

        if (entity && entity.items && Array.isArray(entity.items)) {
            entity.items.forEach((item: any) => {
                const petition: Petition = {
                    id: item.properties.id,
                    title: item.properties.title,
                    description: item.properties.description,
                    image: item.properties.image,
                    author: item.properties.author,
                    signatureCount: parseInt(item.properties.signatureCount, 10),
                    signatureGoal: parseInt(item.properties.signatureGoal, 10),
                    creationDate: new Date(item.properties.creationDate),
                    tags: item.properties.tags.map((tag: any) => ({
                        name: tag.properties.name
                    }))
                };

                petitions.push(petition);
            });
        }

        return petitions;
    }


}
