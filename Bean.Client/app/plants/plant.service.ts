import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Plant } from './plant';
import { IDTO_Plant } from './dto_plant';

@Injectable()
export class PlantService {

    //private _plantApiUrl = 'api/plants/plants.json';
    private _plantApiUrl = 'http://localhost:21709/api/Plants';

    constructor(private _http: Http) { }

    // todo: manage error handling
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    gets(): Observable<Plant[]> {
        return this._http.get(this._plantApiUrl)
            .map((response: Response) => <Plant[]>response.json())
            .catch(this.handleError);
    }

    gets_dto(): Observable<IDTO_Plant[]> {
        console.log('plant.service.gets_dto...');

        // insert search param
        // let params: URLSearchParams = new URLSearchParams();
        // params.set('search', 'So');

        //, {search: params}
        return this._http.get(this._plantApiUrl)
            .map((response: Response) => <IDTO_Plant[]>response.json())
            .do(data => console.log('plant.service.gets_dto data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    get(id: number): Observable<Plant> {
        console.log('plant.service.get(id)');

        // insert id param
        let paramId: URLSearchParams = new URLSearchParams();
        paramId.set('id', id.toString());

        return this._http.get(this._plantApiUrl, {search: paramId})
            .map((response: Response) => <Plant>response.json())
            .do(data => console.log('plant.service.get(id) data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    //todo: post data
    save(plant: Plant): boolean {
        return true;
    }
}