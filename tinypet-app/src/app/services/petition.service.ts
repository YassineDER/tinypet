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

    constructor(private http: HttpClient) {
    }

    getPetitions(): Observable<Petition[]> {
        return of(PETITIONS);
    }

    createPetition(petition: Petition): Observable<Petition> {
        return this.http.post<Petition>(this.API + "/create", petition);
    }

    uploadImage(imageFormData: FormData): Observable<any> {
        return this.http.post(this.API + "/upload", imageFormData);
    }

}
