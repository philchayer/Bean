import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FamilyListComponent } from './family-list.component';
import { FamilyDetailComponent } from './family-detail.component';
import { FamilyFilterPipe } from './family-filter.pipe';
import { FamilyDetailGuard } from './family-guard.service'
import { FamilyService } from './family.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'families', component: FamilyListComponent },
            { path: 'family/:id', canActivate: [FamilyDetailGuard], component: FamilyDetailComponent }
        ])
    ],
    exports: [],
    declarations: [
        FamilyListComponent,
        FamilyDetailComponent,
        FamilyFilterPipe],
    providers: [
        FamilyService,
        FamilyDetailGuard],
})
export class FamilyModule { }
