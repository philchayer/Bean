import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Plant } from './plant';
import { IPlants } from './plants';
import { AuthenticationService } from '../auth/auth.service';

import { Service } from '../shared/const';

@Injectable()
export class PlantService {
    constructor(private _http: Http,
        private _authService: AuthenticationService) { }

    // todo: manage error handling
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    gets(): Observable<IPlants[]> {
        console.log('plant.service.gets() begin...');

        // insert search param
        // let params: URLSearchParams = new URLSearchParams();
        // params.set('search', 'So');

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //, {search: params}
        return this._http.get(Service.PLANT_API_URL, options)
            .map((response: Response) => <IPlants[]>response.json())
            .catch(this.handleError);
    }

    get(id: number): Observable<Plant> {
        console.log('plant.service.get() begin...');

        // insert id param
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id.toString());

        return this._http.get(Service.PLANT_API_URL, { search: params })
            .map((response: Response) => <Plant>response.json())
            .do(data => console.log('plant.service.get(id) data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    add(plant: Plant): Observable<Plant> {
        console.log('plant.service.add() begin...');

        let bodyString = JSON.stringify(plant);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        console.log('plant.service.add(), bodyString: ' + bodyString);

        return this._http.post(Service.PLANT_API_URL, bodyString, options)
            .map((response: Response) => response.json())
            .do(data => console.log('plant.service.add(), data: ' + data))
            .catch(this.handleError);
    }

    update(plant: Plant): Observable<Plant> {
        console.log('plant.service.update() begin...');

        let bodyString = JSON.stringify(plant);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        console.log('plant.service.update(), bodyString: ' + bodyString);

        return this._http.put(`${Service.PLANT_API_URL}/${plant.id}`, bodyString, options)
            .catch(this.handleError);
    }

    delete(plant: IPlants): Observable<IPlants> {
        console.log('plant.service.delete() begin...');

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'bearer ' + this._authService.getToken());

        let options = new RequestOptions({ headers: headers });

        return this._http.delete(`${Service.PLANT_API_URL}/${plant.id}`, options)
            .catch(this.handleError);
    }
}