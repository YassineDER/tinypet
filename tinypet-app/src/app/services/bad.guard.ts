import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "./user.service";
import {SnackBarService} from "./snack-bar.service";

export const badGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state : RouterStateSnapshot) => {
    const user = inject(UserService)
    const snack = inject(SnackBarService)
    if (!user.isAuthentificated) {
        snack.alert('You must be logged in to access this page.', 3000);
        return false;
    }
    return true;
}
