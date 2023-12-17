import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {prod} from "../../environments/environment";
import {SocialUser} from "@abacritt/angularx-social-login";
import { users } from 'src/assets/mocks/users.mock';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    API = prod.URL + "/users/v1";
    public actualUser? :User = isDevMode() ? users[0] : undefined; // mock user is the default user (dev mode case)

  constructor(private http :HttpClient) { }

    validateTokenAndCreateSession(token: string): Observable<User> {
        return this.http.post<User>(this.API + '/validate-token', {token});
    }

    convertEntityToUser(E: any) :User {
      let entity = E.properties;
        return {
            id: entity.id,
            name: entity.name,
            image: entity.image,
            email: entity.email,
            registeredDate: new Date(entity.registeredDate),
            signedPetitions: entity.signedPetitions,
            createdPetitions: entity.createdPetitions
        };
    }

    logout() {
        this.actualUser = undefined;
        localStorage.removeItem('authToken'); // Remove token from storage
    }

    mockLogin() {
        this.logout();
        this.actualUser = users[0];
    }

    get isAuthentificated() :boolean {
        return this.actualUser !== undefined;
    }

}
