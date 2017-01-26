import { Pipe, PipeTransform } from '@angular/core';

import { IPlants } from './plants';

@Pipe({
    name: 'plantFilter'
})
export class PlantFilterPipe implements PipeTransform {

    transform(value: IPlants[], filterBy: string): IPlants[] {

        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        return filterBy ?
            value.filter((plant: IPlants) =>
                plant.name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                plant.latinName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                plant.family.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                plant.binder.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}