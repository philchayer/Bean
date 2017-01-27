import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../auth/auth.service';

@Injectable()
export class PlantDetailGuard implements CanActivate {

    constructor(private _router: Router,
                private _auth: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // verify the plant.id
        let id = +route.url[1].path;

        if (isNaN(id) || id < 0) {
            // navigate to plant list
            this._router.navigate(['/plants']);
            // abort current navigation
            return false;
        }

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