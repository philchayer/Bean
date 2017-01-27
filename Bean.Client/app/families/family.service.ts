import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Family } from './family';
import { IFamilies } from './families';
import { AuthenticationService } from '../auth/auth.service';

import { Service } from '../shared/const';

@Injectable()
export class FamilyService {
    constructor(private _http: Http,
        private _authService: AuthenticationService) { }

    // todo: manage error handling
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    gets(): Observable<IFamilies[]> {
        console.log('family.service.gets() begin...');

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.get(Service.FAMILY_API_URL, options)
            .map((response: Response) => <IFamilies[]>response.json())
            .catch(this.handleError);
    }

    get(id: number): Observable<Family> {
        console.log('family.service.get() begin...');

        // insert id param
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id.toString());

        return this._http.get(Service.FAMILY_API_URL, { search: params })
            .map((response: Response) => <Family>response.json())
            .do(data => console.log('family.service.get(id) data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    add(family: Family): Observable<Family> {
        console.log('family.service.add() begin...');

        let bodyString = JSON.stringify(family);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        console.log('family.service.add(), bodyString: ' + bodyString);

        return this._http.post(Service.FAMILY_API_URL, bodyString, options)
            .map((response: Response) => response.json())
            .do(data => console.log('family.service.add(), data: ' + data))
            .catch(this.handleError);
    }

    update(family: Family): Observable<Family> {
        console.log('family.service.update() begin...');

        let bodyString = JSON.stringify(family);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        console.log('family.service.update(), bodyString: ' + bodyString);

        return this._http.put(`${Service.FAMILY_API_URL}/${family.id}`, bodyString, options)
            .catch(this.handleError);
    }

    delete(family: IFamilies): Observable<IFamilies> {
        console.log('family.service.delete() begin...');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        return this._http.delete(`${Service.FAMILY_API_URL}/${family.id}`, options)
            .catch(this.handleError);
    }
}