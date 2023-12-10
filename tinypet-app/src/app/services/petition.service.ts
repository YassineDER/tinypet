import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PETITIONS } from 'src/assets/mocks/petitions.mock';
import { Petition } from '../models/petition';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  constructor() { }

  getPetitions() :Observable<Petition[]> {
    return of(PETITIONS);
  }

}
