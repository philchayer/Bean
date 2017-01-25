import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { Authentication } from './auth';
import { AuthenticationService } from './auth.service';
import { Token } from '../shared/token';

@Component({
    moduleId: module.id,
    selector: 'auth-login',
    templateUrl: 'auth.component.html'
})
export class AuthenticationComponent implements OnInit {
    message: string;
    auth: Authentication = new Authentication();

    isLoggedIn: boolean = false;

    constructor(private _authService: AuthenticationService) { }

    ngOnInit() { }

    login(): void {
        console.log('auth.component.login() begin...');

        this._authService.login(this.auth)
            .subscribe(response => this.onLogin(response),
            error => this.message = <any>error);

        console.log('auth.component.login() end');
    }

    private onLogin(token: Token): void {
        console.log('auth.component.onLogin() begin...');

        this.message = '';
        this.isLoggedIn = true;

        localStorage.setItem('token', token.access_token);

        console.log('auth.component.onLogin() end');
    }

    logout(): void {

        console.log('auth.component.logout() begin ...');

        this.auth = new auth();
        this.isLoggedIn = false;

        console.log('auth.component.logout() end');
    }

    register(): void {
        console.log('auth.component.register() begin...');

        this._authService.register(this.auth)
            .subscribe(auth => this.onRegister(auth),
            error => this.message = <any>error);

        console.log('auth.component.register() finished');
    }

    onRegister(auth: auth): void {
        console.log('registration successful!');

        this.auth = auth;
        this.isLoggedIn = true;
    }


}