import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Family } from './family';
import { FamilyService } from './family.service';

@Component({
    moduleId: module.id,
    templateUrl: 'family-detail.component.html'
})
export class FamilyDetailComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Family Detail';
    errorMessage: string;
    family: Family;

    private subscription: Subscription;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _familyService: FamilyService) {
    }

    ngOnInit(): void {
        this.subscription = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getFamily(id);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getFamily(id: number) {
        try {
            this._familyService.get(id).subscribe(
                family => this.family = family,
                error => this.errorMessage = <any>error);
        }
        catch (error) {
            this.errorMessage = error.toString();
        }
    }

    onSubmit(form: NgForm): void {
        // validations
        if (form.invalid){
            alert('invalid data');
            return;
        }

        if (this.family.id == 0){
            this._familyService.add(this.family).subscribe(
                family => this.family = family,
                error => this.errorMessage = <any>error);
        }
        else {
            this._familyService.update(this.family).subscribe(
                family => this.family = family,
                error => this.errorMessage = <any>error);
            }

        console.log('family-detail.component.onSubmit() finished');
    }

}