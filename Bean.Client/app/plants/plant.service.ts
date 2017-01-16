import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Plant } from './plant';
import { IDTO_Plant } from './dto_plant';

@Injectable()
export class PlantService {

    //private _plantApiUrl = 'api/plants/plants.json';
    private API_URL = 'http://localhost:21709/api/Plants';

    constructor(private _http: Http) { }

    // todo: manage error handling
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    gets(): Observable<Plant[]> {
        return this._http.get(this.API_URL)
            .map((response: Response) => <Plant[]>response.json())
            .catch(this.handleError);
    }

    gets_dto(): Observable<IDTO_Plant[]> {
        console.log('plant.service.gets_dto() begin...');

        // insert search param
        // let params: URLSearchParams = new URLSearchParams();
        // params.set('search', 'So');

        //, {search: params}
        return this._http.get(this.API_URL)
            .map((response: Response) => <IDTO_Plant[]>response.json())
            .do(data => console.log('plant.service.gets_dto data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    get(id: number): Observable<Plant> {
        console.log('plant.service.get() begin...');

        // insert id param
        let paramId: URLSearchParams = new URLSearchParams();
        paramId.set('id', id.toString());

        return this._http.get(this.API_URL, { search: paramId })
            .map((response: Response) => <Plant>response.json())
            .do(data => console.log('plant.service.get(id) data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    add(plant: Plant): Observable<Plant> {
        console.log('plant.service.add() begin...');

        let bodyString = JSON.stringify(plant);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log('plant.service.add(), bodyString: ' + bodyString);

        return this._http.post(this.API_URL, bodyString, options)
            .map((response: Response) => response.json())
            .do(data => console.log('plant.service.add(), data: ' + data))
            .catch(this.handleError);
    }

    update(plant: Plant): Observable<Plant> {
        console.log('plant.service.update() begin...');

        let bodyString = JSON.stringify(plant);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log('plant.service.update(), bodyString: ' + bodyString);

        return this._http.put(`${this.API_URL}/${plant.id}`, bodyString, options)
            .catch(this.handleError);
    }

    delete(plant: IDTO_Plant): Observable<IDTO_Plant> {
        console.log('plant.service.delete() begin...');

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.delete(`${this.API_URL}/${plant.id}`, options)
            .catch(this.handleError);
    }
}