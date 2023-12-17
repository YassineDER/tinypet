import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tag} from "../models/tag";
import {map, Observable} from "rxjs";
import {prod} from "../../environments/environment";
import {User} from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class TagService {
    API = prod.URL + "/tags/v1";

    constructor(private http: HttpClient) {}

    getTags(): Observable<Tag[]> {
        return this.http.get<{ items: any[] }>(this.API + '/all').pipe(
            map(response => this.convertEntityListToTagList(response.items))
        )
    }

    // convert the entity list format to a tag list format
    convertEntityListToTagList(entities: any[]): Tag[] {
        return entities.map(entity => ({
            name: entity.properties.name
        }))
    }

}
