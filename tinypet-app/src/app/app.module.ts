import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import { GoogleLoginProvider} from "@abacritt/angularx-social-login";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePetitionComponent } from './components/create-petition/create-petition.component';
import { MyPetitionsComponent } from './components/my-petitions/my-petitions.component';
import { PetitionsListComponent } from './components/petitions-list/petitions-list.component';
import { prod } from "../environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from "@angular/common/http";
import { SplashScreenStateService } from './services/splash-screen-state.service';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {PetitionComponent} from "./components/petition/petition.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePetitionComponent,
    MyPetitionsComponent,
    PetitionsListComponent,
    SplashScreenComponent,
      PetitionComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        SocialLoginModule,
        GoogleSigninButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSliderModule
    ],
  providers: [
    SplashScreenStateService,
      {
      provide: 'SocialAuthServiceConfig',
      useValue: isDevMode() ? { providers : [] } : {
        autoLogin: true,
        providers: [{
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(prod.googleClientId)}
        ],
        onError: (err: any) => console.error("Cannot use Google Login: " + err.message)
    } as SocialAuthServiceConfig,
}],
  bootstrap: [AppComponent]
})

export class AppModule { }
