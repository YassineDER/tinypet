import {Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
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
    user?: User;

    constructor(private authService: SocialAuthService,
                private _snackBar: MatSnackBar,
                private userService :UserService) {}


    ngOnInit() {
        // Check if user is already authenticated by looking for a stored token
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            this.userService.validateTokenAndCreateSession(storedToken).subscribe({
                next: (user) => this.user = this.userService.convertEntityToUser(user),
                error: (error) => {
                    this.logout(); // Logout user and remove token from storage
                    this.subscribeToAuthState(); // Subscribe to authState for new login
                }
            });
        } else {
            this.subscribeToAuthState();
        }
    }

    private subscribeToAuthState() {
        this.authService.authState.subscribe({
            next: (s_user) => {
                if (s_user) {
                    localStorage.setItem('authToken', s_user.idToken);
                    this.userService.validateTokenAndCreateSession(s_user.idToken).subscribe({
                        next: (user) => this.user = this.userService.convertEntityToUser(user),
                        error: (error) => this._snackBar.open('Request Error: ' + error.message, 'OK')
                    });
                }
            }, error: (error) => this._snackBar.open('Authentication Error: ' + error.message, 'OK')
        });
    }


    logout() {
        this.user = undefined;
        localStorage.removeItem('authToken'); // Remove token from storage
    }


    // to be removed in production
    testTask() {
    }
}
