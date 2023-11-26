import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {SocialUser} from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    API = environment.URL + "/users/v1";

  constructor(private http :HttpClient) { }

    saveOrGetUser(user: any) : Observable<User>{
        return this.http.post<User>(this.API + '/add', user);
    }

    validateTokenAndCreateSession(token: string): Observable<User> {
        return this.http.post<User>(this.API + '/validate-token', {token});
    }

    convertSocialToUser(socialUser: SocialUser) {
        if (!socialUser) return undefined;
        let U: User = {
            id: socialUser.id,
            name: socialUser.name,
            image: socialUser.photoUrl,
            email: socialUser.email,
            registeredDate: new Date(),
            signedPetitions: [],
            createdPetitions: []
        }

        return U;
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
}
