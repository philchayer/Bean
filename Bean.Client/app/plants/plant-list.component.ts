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

    onDelete(plant: IDTO_Plant): boolean {
        let result = window.confirm(`Are you sure you want to delete ${plant.name}?`);

        if (result)
            this._plantService.delete(plant).subscribe(
                deletedPlant => this.afterDelete(plant),
                error => this.errorMessage = <any>error);
        else
            console.log('user cancelled operation');

        return result;

    }

    afterDelete(plant: IDTO_Plant): void {
        console.log('plant-list.component.afterDelete() begin...');
        console.log(`plant data: ${plant}`);

        let index = this.dto_plants.indexOf(plant);
        console.log(`index:${index}`);
        if (index > -1)
            this.dto_plants.splice(index, 1);

        console.log('this.dto_plants length: ' + this.dto_plants.length);
    }

}