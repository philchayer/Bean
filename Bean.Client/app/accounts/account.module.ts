import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AccountComponent } from './account.component';
import { AccountService } from './account.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        HttpModule
    ],
    exports: [],
    declarations: [
        AccountComponent],
    providers: [
        AccountService],
})
export class AccountModule { }
