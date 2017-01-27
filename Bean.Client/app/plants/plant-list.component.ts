import { Component, OnInit } from '@angular/core';

import { IPlants } from './plants';
import { PlantService } from './plant.service';

@Component({
    moduleId: module.id,
    templateUrl: 'plant-list.component.html'
})
export class PlantListComponent implements OnInit {

    pageTitle: string = 'Seeds and plants list';
    listFilter: string;
    plants: IPlants[];
    errorMessage: string;

    constructor(private _plantService: PlantService) { }

    ngOnInit() {
        this._plantService.gets()
            .subscribe(plants => this.plants = plants,
            error => this.errorMessage = <any>error);

        console.log('plant-list.component.ngOnInit, gets: ' + this.plants);
    }

    onDelete(plant: IPlants): boolean {
        let result = window.confirm(`Are you sure you want to delete the plant ${plant.name}?`);

        if (result)
            this._plantService.delete(plant).subscribe(
                deletedPlant => this.afterDelete(plant),
                error => this.errorMessage = <any>error);
        else
            console.log('user cancelled operation');

        return result;

    }

    afterDelete(plant: IPlants): void {
        console.log('plant-list.component.afterDelete() begin...');
        console.log(`plant data: ${plant}`);

        let index = this.plants.indexOf(plant);
        console.log(`index:${index}`);
        if (index > -1)
            this.plants.splice(index, 1);

        console.log('this.plants length: ' + this.plants.length);
    }

}