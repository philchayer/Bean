import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlantListComponent } from './plant-list.component';
import { PlantDetailComponent } from './plant-detail.component';
import { PlantFilterPipe } from './plant-filter.pipe';
import { PlantDetailGuard } from './plant-guard.service'
import { PlantService } from './plant.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'plants', component: PlantListComponent },
            { path: 'plant/:id', canActivate: [PlantDetailGuard], component: PlantDetailComponent }
        ])
    ],
    exports: [],
    declarations: [
        PlantListComponent,
        PlantDetailComponent,
        PlantFilterPipe],
    providers: [
        PlantService,
        PlantDetailGuard],
})
export class PlantModule { }
