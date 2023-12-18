import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PETITIONS} from 'src/assets/mocks/petitions.mock';
import {Petition} from '../models/petition';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {prod} from "../../environments/environment";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable({
    providedIn: 'root'
})
export class PetitionService {
    API = prod.URL + '/petitions/v1';
    STORAGE_API = 'https://storage.googleapis.com/upload/storage/v1/b/tinypet-404519.appspot.com/o';

    constructor(private http: HttpClient) {}

    getPetitions(): Observable<Petition[]> {
        return of(PETITIONS);
    }

    createPetition(petition: Petition): Observable<Petition> {
        return this.http.post<Petition>(this.API + "/create", petition);
    }



}
