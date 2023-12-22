import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePetitionComponent } from './components/create-petition/create-petition.component';
import { PetitionsListComponent } from './components/petitions-list/petitions-list.component';
import { MyPetitionsComponent } from './components/my-petitions/my-petitions.component';
import { HomeComponent } from './components/home/home.component';
import {badGuard} from "./services/bad.guard";
import {PetitionComponent} from "./components/petition/petition.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create', component: CreatePetitionComponent, canActivate: [badGuard] },
  { path: 'petitions', component: PetitionsListComponent },
    { path: 'petition/:id', component: PetitionComponent },
  { path: 'mypetitions', component: MyPetitionsComponent, canActivate: [badGuard] },
    { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
