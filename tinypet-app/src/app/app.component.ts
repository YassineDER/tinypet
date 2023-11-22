import {Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";

declare var $: any; // jQuery

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    user: SocialUser | undefined;
    loggedIn: boolean | undefined;
    accessToken = '';
    title = 'tinypet-app';

    constructor(private socialAuthService: SocialAuthService) {
    }

    ngOnInit() {
        this.socialAuthService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
        });
    }

    logout() {
        this.socialAuthService.signOut().then(r => {
            this.user = undefined;
            this.loggedIn = false;
            this.accessToken = '';
        })
    }

    getAccessToken(): void {
        this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
    }

    refreshToken(): void {
        this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    printUser(): void {
        console.log(this.user);
    }
}
