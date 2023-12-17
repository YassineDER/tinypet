import { Component, OnInit, isDevMode } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { SplashScreenStateService } from './services/splash-screen-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    public user?: User;

    constructor(
        private authService: SocialAuthService,
        private _snackBar: MatSnackBar,
        public userService: UserService,
        private splashService: SplashScreenStateService
    ) {}

    // Hide splash screen after view is properly initialized
    ngAfterViewInit() {
        setTimeout(() => this.splashService.stop(), isDevMode() ? 0 : 1000)
    }


    ngOnInit() {
        // Check if user is already authenticated by looking for a stored token
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            this.userService
                .validateTokenAndCreateSession(storedToken)
                .subscribe({
                    next: (user) => this.userService.actualUser = this.userService.convertEntityToUser(user),
                    error: (error) => {
                        this.logout(); // Logout user and remove token from storage
                        this.subscribeToAuthState(); // Subscribe to authState for new login
                    },
                });
        }
        else if (!isDevMode()) this.subscribeToAuthState();

        this.user = this.userService.actualUser;
    }

    private subscribeToAuthState() {
        this.authService.authState.subscribe({
            next: (s_user) => {
                if (s_user) {
                    localStorage.setItem('authToken', s_user.idToken);
                    this.userService
                        .validateTokenAndCreateSession(s_user.idToken)
                        .subscribe({
                            next: (user) => this.userService.actualUser = this.userService.convertEntityToUser(user),
                            error: (error) => this._snackBar.open('Request Error: ' + error.message, 'OK'),
                        });
                }
            },
            error: (error) => this._snackBar.open('Authentication Error: ' + error.message,'OK'),
        })
    }

    logout() {
        this.userService.logout()
        this.user = this.userService.actualUser;
    }

    connectAsMockUser() {
        this.userService.mockLogin();
        this.user = this.userService.actualUser;
    }

    protected readonly isDevMode = isDevMode;
}
