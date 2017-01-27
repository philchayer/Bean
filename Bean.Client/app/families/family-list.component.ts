import { Component, OnInit } from '@angular/core';

import { IFamilies } from './families';
import { FamilyService } from './family.service';

@Component({
    moduleId: module.id,
    templateUrl: 'family-list.component.html'
})
export class FamilyListComponent implements OnInit {

    pageTitle: string = 'Seeds and families list';
    listFilter: string;
    families: IFamilies[];
    errorMessage: string;

    constructor(private _familyService: FamilyService) { }

    ngOnInit() {
        this._familyService.gets()
            .subscribe(families => this.families = families,
            error => this.errorMessage = <any>error);
    }

    onDelete(family: IFamilies): boolean {
        let result = window.confirm(`Are you sure you want to delete the family ${family.name}?`);

        if (result)
            this._familyService.delete(family).subscribe(
                deletedFamily => this.afterDelete(family),
                error => this.errorMessage = <any>error);
        else
            console.log('user cancelled operation');

        return result;

    }

    afterDelete(family: IFamilies): void {
        console.log('family-list.component.afterDelete() begin...');
        console.log(`family data: ${family}`);

        let index = this.families.indexOf(family);
        console.log(`index:${index}`);
        if (index > -1)
            this.families.splice(index, 1);

        console.log('this.families length: ' + this.families.length);
    }

}