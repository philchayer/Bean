import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class PlantDetailGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        let id = +route.url[1].path;

        if (isNaN(id) || id < 1) {
            // navigate to plant list
            this._router.navigate(['/plants']);
            // abort current navigation
            return false;
        };

        return true;
    }
}