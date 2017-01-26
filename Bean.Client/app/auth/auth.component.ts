import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService } from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthenticationComponent implements OnInit {
    constructor(private _auth: AuthenticationService) { }

    ngOnInit() { }

    logout(): void {

        console.log('auth.component.logout() begin ...');

        localStorage.removeItem('token');
        this._auth.isLoggedIn = false;

        console.log('auth.component.logout() end');
    }

    isLoggedIn(): boolean{
        return this._auth.isLoggedIn;
    }


}