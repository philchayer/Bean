import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Account } from './account';

@Injectable()
export class AccountService {

    //private _plantApiUrl = 'api/accounts/accounts.json';
    private readonly API_URL = 'http://localhost:21709/';
    private API_ACCOUNT_URL = this.API_URL + 'api/Account';

    constructor(private _http: Http) { }

    // todo: manage error handling
    private handleError(error: Response) {
        console.log('account.service.handleError() begin...');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    login(account: Account): Observable<Response> {
        console.log('account.service.login() begin...');

        let param = new URLSearchParams();
        param.set('userName', account.email);
        param.set('password', account.password);
        param.set('grant_type', 'password');

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(`${this.API_URL}/Token`, param, options)
            .do(response => console.log(typeof(response)))
            .catch(this.handleError);
    }

    register(account: Account): Observable<Account> {
        console.log('account.service.register() begin...');

        // todo: remove temporary confirm password when created real page
        account.confirmPassword = account.password;

        let bodyString = JSON.stringify(account);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log(bodyString);

        return this._http.post(`${this.API_ACCOUNT_URL}/Register`, bodyString, options)
            .do(data => console.log('account.service.register(), data: ' + data))
            .catch(this.handleError);
    }

}