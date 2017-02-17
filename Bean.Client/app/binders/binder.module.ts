import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BinderListComponent } from './binder-list.component';
import { BinderDetailComponent } from './binder-detail.component';
import { BinderFilterPipe } from './binder-filter.pipe';
import { BinderDetailGuard } from './binder-guard.service'
import { BinderService } from './binder.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'binders', component: BinderListComponent },
            { path: 'binder/:id', canActivate: [BinderDetailGuard], component: BinderDetailComponent }
        ])
    ],
    exports: [],
    declarations: [
        BinderListComponent,
        BinderDetailComponent,
        BinderFilterPipe],
    providers: [
        BinderService,
        BinderDetailGuard],
})
export class BinderModule { }
