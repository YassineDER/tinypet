import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import { GoogleLoginProvider} from "@abacritt/angularx-social-login";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreatePetitionComponent } from './components/create-petition/create-petition.component';
import { MyPetitionsComponent } from './components/my-petitions/my-petitions.component';
import { PetitionsListComponent } from './components/petitions-list/petitions-list.component';
import {NgOptimizedImage} from "@angular/common";
import {environment} from "../environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePetitionComponent,
    MyPetitionsComponent,
    PetitionsListComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        SocialLoginModule,
        GoogleSigninButtonModule,
        BrowserAnimationsModule,
    ],
  providers: [{
      provide: 'SocialAuthServiceConfig',
      useValue: {
          autoLogin: true,
          providers: [{
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(environment.googleClientId)}
          ],
          onError: (err: any) => console.error(err)
      } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
