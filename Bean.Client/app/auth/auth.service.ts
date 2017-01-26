import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Authentication } from './auth';
import { Service } from '../shared/const';

@Injectable()
export class AuthenticationService {
    constructor(private _http: Http) { }

    // todo: manage error handling
    private handleError(error: Response) {
        console.log('auth.service.handleError() begin...');
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    login(auth: Authentication): Observable<boolean> {
        console.log('auth.service.login() begin...');

        let param = new URLSearchParams();
        param.set('userName', auth.email);
        param.set('password', auth.password);
        param.set('grant_type', 'password');

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(Service.TOKEN_URL, param, options)
            .map((data) => {
                if (data.status == 200) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('token', data.json().access_token);
                    auth.statusText = '';
                }
                return true;
            })
            .catch((this.handleError));
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
    }

    register(auth: Authentication): Observable<Authentication> {
        console.log('auth.service.register() begin...');

        // todo: remove temporary confirm password when created real page
        auth.confirmPassword = auth.password;

        let bodyString = JSON.stringify(auth);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log(bodyString);

        return this._http.post(Service.REGISTER_API_URL, bodyString, options)
            .do(data => console.log('auth.service.register(), data: ' + data))
            .catch(this.handleError);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {

        let isLoggedIn: boolean = (localStorage.getItem('isLoggedIn') === 'true');

        return isLoggedIn;
    }

}