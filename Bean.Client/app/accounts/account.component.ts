import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { Account } from './account';
import { AccountService } from './account.service';
import { Token } from '../shared/token';

@Component({
    moduleId: module.id,
    selector: 'account-login',
    templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
    message: string;
    account: Account = new Account();

    isLoggedIn: boolean = false;

    constructor(private _accountService: AccountService) { }

    ngOnInit() { }

    login(): void {
        console.log('account.component.login() begin...');

        this._accountService.login(this.account)
            .subscribe(response => this.onLogin(response),
            error => this.message = <any>error);

        console.log('account.component.login() end');
    }

    private onLogin(token: Token): void {
        console.log('account.component.onLogin() begin...');

        this.message = '';
        this.isLoggedIn = true;

        localStorage.setItem('token', token.access_token);

        console.log('account.component.onLogin() end');
    }

    logout(): void {

        console.log('account.component.logout() begin ...');

        this.account = new Account();
        this.isLoggedIn = false;

        console.log('account.component.logout() end');
    }

    register(): void {
        console.log('account.component.register() begin...');

        this._accountService.register(this.account)
            .subscribe(account => this.onRegister(account),
            error => this.message = <any>error);

        console.log('account.component.register() finished');
    }

    onRegister(account: Account): void {
        console.log('registration successful!');

        this.account = account;
        this.isLoggedIn = true;
    }


}