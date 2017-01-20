import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Account } from './account';
import { AccountService } from './account.service';

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

        
    }
}