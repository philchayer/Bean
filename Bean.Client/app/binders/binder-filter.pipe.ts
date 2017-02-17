import { Pipe, PipeTransform } from '@angular/core';

import { Binder } from './binder';

@Pipe({
    name: 'binderFilter'
})
export class BinderFilterPipe implements PipeTransform {

    transform(value: Binder[], filterBy: string): Binder[] {

        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        return filterBy ?
            value.filter((binder: Binder) =>
                binder.description.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}