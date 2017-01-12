import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Plant } from './plant';
import { DTO_Plant } from './dto_plant';

@Injectable()
export class PlantService {

    //private _plantApiUrl = 'api/plants/plants.json';
    private _plantApiUrl = 'http://localhost:21709/api/Plants';

    constructor(private _http: Http) { }

    //todo: manage error handling
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    gets(): Observable<Plant[]> {
        return this._http.get(this._plantApiUrl)
            .map((response: Response) => <Plant[]>response.json())
            .catch(this.handleError);
    }

    gets_dto(): Observable<DTO_Plant[]> {
        console.log('plant.service.gets_dto...');

        return this._http.get(this._plantApiUrl)
            .map((response: Response) => <DTO_Plant[]>response.json())
            .do(data => console.log('Data: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    get(id: number): Observable<Plant> {
        return this.gets()
            .map((plants: Plant[]) => plants.find(p => p.id === id));;
    }

    //todo: post data
    save(plant: Plant): boolean {
        return true;
    }
}