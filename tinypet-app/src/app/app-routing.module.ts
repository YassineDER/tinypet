import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePetitionComponent } from './components/create-petition/create-petition.component';
import { PetitionsListComponent } from './components/petitions-list/petitions-list.component';
import { MyPetitionsComponent } from './components/my-petitions/my-petitions.component';
import { HomeComponent } from './components/home/home.component';
import {badGuard} from "./services/bad.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreatePetitionComponent, canActivate: [badGuard] },
  { path: 'petitions', component: PetitionsListComponent },
  { path: 'mypetitions', component: MyPetitionsComponent, canActivate: [badGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
