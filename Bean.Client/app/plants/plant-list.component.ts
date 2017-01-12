import { Component, OnInit } from '@angular/core';

import { Plant } from './plant';
import { IDTO_Plant } from './dto_plant';
import { PlantService } from './plant.service';

@Component({
    moduleId: module.id,
    templateUrl: 'plant-list.component.html'
})
export class PlantListComponent implements OnInit {

    pageTitle: string = 'Seeds and plants list';
    listFilter: string;
    plants: Plant[];
    dto_plants: IDTO_Plant[];
    errorMessage: string;

    constructor(private _plantService: PlantService) { }

    ngOnInit() {
        this._plantService.gets_dto()
            .subscribe(plants => this.dto_plants = plants,
            error => this.errorMessage = <any>error);

        console.log('plant-list.component.ngOnInit, gets_dto: ' + this.dto_plants);
    }

}