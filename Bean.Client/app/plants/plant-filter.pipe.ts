import { Pipe, PipeTransform } from '@angular/core';

import { Plant } from './plant';

@Pipe({
    name: 'plantFilter'
})
export class PlantFilterPipe implements PipeTransform {

    transform(value: Plant[], filterBy: string): Plant[] {

        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        return  filterBy ?
            value.filter((plant: Plant) =>
                            plant.name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                            plant.quantityOnHand.toString().indexOf(filterBy) !== -1 ||
                            plant.family.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                            plant.latinName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}