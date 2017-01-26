import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Plant } from './plant';
import { PlantService } from './plant.service';

@Component({
    moduleId: module.id,
    templateUrl: 'plant-detail.component.html'
})
export class PlantDetailComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Plant Detail'
    errorMessage: string;
    plant: Plant;

    private subscription: Subscription;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _plantService: PlantService) {
    }

    ngOnInit(): void {
        this.subscription = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getPlant(id);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getPlant(id: number) {
        try {
            this._plantService.get(id).subscribe(
                plant => this.plant = plant,
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

        if (this.plant.id == 0)
            this._plantService.add(this.plant).subscribe(
                plant => this.plant = plant,
                error => this.errorMessage = <any>error);
        else
            this._plantService.update(this.plant).subscribe(
                plant => this.plant = plant,
                error => this.errorMessage = <any>error);

        console.log('plant-detail.component.onSubmit() finished');
    }

}