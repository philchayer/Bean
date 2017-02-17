import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Binder } from './binder';
import { AuthenticationService } from '../auth/auth.service';

import { Service } from '../shared/const';

@Injectable()
export class BinderService {
    constructor(private _http: Http,
        private _authService: AuthenticationService) { }

    // todo: manage error handling
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    gets(): Observable<Binder[]> {
        console.log('binder.service.gets() begin...');

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.get(Service.BINDER_API_URL, options)
            .map((response: Response) => <Binder[]>response.json())
            .catch(this.handleError);
    }

    get(id: number): Observable<Binder> {
        console.log('binder.service.get() begin...');

        // insert id param
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id.toString());

        return this._http.get(Service.BINDER_API_URL, { search: params })
            .map((response: Response) => <Binder>response.json())
            .do(data => console.log('binder.service.get(id) data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    add(binder: Binder): Observable<Binder> {
        console.log('binder.service.add() begin...');

        let bodyString = JSON.stringify(binder);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        console.log('binder.service.add(), bodyString: ' + bodyString);

        return this._http.post(Service.BINDER_API_URL, bodyString, options)
            .map((response: Response) => response.json())
            .do(data => console.log('binder.service.add(), data: ' + data))
            .catch(this.handleError);
    }

    update(binder: Binder): Observable<Binder> {
        console.log('binder.service.update() begin...');

        let bodyString = JSON.stringify(binder);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        console.log('binder.service.update(), bodyString: ' + bodyString);

        return this._http.put(`${Service.BINDER_API_URL}/${binder.id}`, bodyString, options)
            .catch(this.handleError);
    }

    delete(binder: Binder): Observable<Binder> {
        console.log('binder.service.delete() begin...');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        return this._http.delete(`${Service.BINDER_API_URL}/${binder.id}`, options)
            .catch(this.handleError);
    }
}