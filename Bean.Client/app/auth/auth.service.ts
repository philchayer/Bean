import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Authentication } from './auth';
import { Token } from '../shared/token';

@Injectable()
export class AuthenticationService {

    private readonly API_URL = 'http://localhost:21709/';
    private API_AUTH_URL = this.API_URL + 'api/Account';

    constructor(private _http: Http) { }

    // todo: manage error handling
    private handleError(error: Response) {
        console.log('auth.service.handleError() begin...');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    login(auth: Authentication): Observable<Token> {
        console.log('auth.service.login() begin...');

        let param = new URLSearchParams();
        param.set('userName', auth.email);
        param.set('password', auth.password);
        param.set('grant_type', 'password');

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(`${this.API_URL}/Token`, param, options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    register(auth: Authentication): Observable<Authentication> {
        console.log('auth.service.register() begin...');

        // todo: remove temporary confirm password when created real page
        auth.confirmPassword = auth.password;

        let bodyString = JSON.stringify(auth);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log(bodyString);

        return this._http.post(`${this.API_AUTH_URL}/Register`, bodyString, options)
            .do(data => console.log('auth.service.register(), data: ' + data))
            .catch(this.handleError);
    }

    getToken(): string {
        return  localStorage.getItem('token');
    }

}