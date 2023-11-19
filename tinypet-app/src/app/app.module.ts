import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePetitionComponent } from './components/create-petition/create-petition.component';
import { MyPetitionsComponent } from './components/my-petitions/my-petitions.component';
import { PetitionsListComponent } from './components/petitions-list/petitions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePetitionComponent,
    MyPetitionsComponent,
    PetitionsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
