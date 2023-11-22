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
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePetitionComponent,
    MyPetitionsComponent,
    PetitionsListComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        SocialLoginModule,
        GoogleSigninButtonModule,
    ],
  providers: [{
      provide: 'SocialAuthServiceConfig',
      useValue: {
          autoLogin: true,
          providers: [{
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider('527092413767-a12gm70hgua8ers9ommcuqk77919ci4j.apps.googleusercontent.com')}
          ],
          onError: (err: any) => console.error(err)
      } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
