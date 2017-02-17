import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../auth/auth.service';

@Injectable()
export class BinderDetailGuard implements CanActivate {

    constructor(private _router: Router,
                private _auth: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // verify the binder.id
        let id = +route.url[1].path;

        if (isNaN(id) || id < 0) {
            // navigate to binder list
            this._router.navigate(['/binders']);
            console.log("Guard deactivate route");
            // abort current navigation
            return false;
        };

        // verify the authentication
        if (!this._auth.isLoggedIn()) {
            // user isn't logged in so navigate to login
            this._router.navigate(['/login']);
            // abort current navigation
            return false;
        }

        return true;
    }
}