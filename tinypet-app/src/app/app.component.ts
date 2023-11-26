import {Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "./services/user.service";
import {User} from "./models/user";

declare var $: any; // jQuery

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
    user: User | undefined;
    isLoading = true;
    accessToken = '';

    constructor(private authService: SocialAuthService,
                private _snackBar: MatSnackBar,
                private userService :UserService) {}


    ngOnInit() {
        // check if auth was successful
        this.authService.authState.subscribe({
            next: (user) => {
                let U = this.userService.convertSocialToUser(user);
                this.userService.saveOrGetUser(U).subscribe({
                    next: (response) => {
                        this.user = this.userService.convertEntityToUser(response)
                        this.isLoading = false;
                    },
                    error: (error) => {
                        this._snackBar.open('Request Error: ' + error.message, 'OK')
                        this.isLoading = false;
                    }
                })
            }, error: (error) => {
                this.isLoading = false;
                this._snackBar.open('Authentication Error: ' + error.message, 'OK')
            }
        })
    }

    logout() {
        this.authService.signOut().then(r => {
            this.user = undefined;
            this.accessToken = '';
        }).catch(e => this._snackBar.open('Cannot logout: ' + e.message, 'OK', {
            duration: 3500, horizontalPosition: 'end', verticalPosition: 'top'
        }))

    }

    // these are sensitive, to be secured
    getAccessToken(): void {
        this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken)
            .catch(e => this._snackBar.open('Cannot get access token: ' + e.message, 'OK', {
                duration: 3500, horizontalPosition: 'end', verticalPosition: 'top'
            }))
    }

    refreshToken(): void {
        this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).catch(e => this._snackBar.open('Cannot refresh token: ' + e.message, 'OK', {
            duration: 3500, horizontalPosition: 'end', verticalPosition: 'top'
        }))
    }

    // to be removed in production
    printUser(): void {
        console.log(this.user)
    }
}
