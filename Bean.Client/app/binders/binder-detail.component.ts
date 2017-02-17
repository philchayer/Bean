import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Binder } from './binder';
import { BinderService } from './binder.service';

@Component({
    moduleId: module.id,
    templateUrl: 'binder-detail.component.html'
})
export class BinderDetailComponent implements OnInit, OnDestroy {

    pageTitle: string = 'Binder Detail'
    errorMessage: string;
    binder: Binder;

    private subscription: Subscription;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _binderService: BinderService) {
    }

    ngOnInit(): void {
        this.subscription = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getBinder(id);
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getBinder(id: number) {
        try {
            this._binderService.get(id).subscribe(
                binder => this.binder = binder,
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

        if (this.binder.id == 0)
            this._binderService.add(this.binder).subscribe(
                binder => this.binder = binder,
                error => this.errorMessage = <any>error);
        else
            this._binderService.update(this.binder).subscribe(
                binder => this.binder = binder,
                error => this.errorMessage = <any>error);

        console.log('binder-detail.component.onSubmit() finished');
    }

}