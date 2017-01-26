import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Authentication } from './auth';
import { AuthenticationService } from './auth.service';
import { AuthenticationComponent } from './auth.component';

@Component({
    moduleId: module.id,
    selector: 'auth-login',
    templateUrl: 'auth-login.component.html',
    styleUrls: ['auth.component.css']
})
export class AuthenticationLoginComponent implements OnInit {
    auth: Authentication = new Authentication();
    message: string;

    constructor(private _authService: AuthenticationService,
        private _location: Location) { }

    ngOnInit() { }

    back() {
        this._location.back();
    }

    clearValues() {
        this.auth.email = '';
        this.auth.password = '';
    }

    login() {
        console.log('auth.component.login() begin...');

        this._authService.login(this.auth)
            .subscribe(auth => this.onLogin(auth),
            error => this.message = <any>error);

        console.log('auth.component.login() end');
    }

    private onLogin(successful: boolean) {
        console.log('auth.component.onLogin() begin...');
        this._location.back();
    }

    register(): void {
        console.log('auth.component.register() begin...');

        this._authService.register(this.auth)
            .subscribe(auth => this.onRegister(auth),
            error => this.message = <any>error);

        console.log('auth.component.register() finished');
    }

    private onRegister(auth: Authentication) {
        console.log('registration successful!');

        this.auth = auth;
    }
}