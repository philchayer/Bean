import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthenticationComponent } from './auth.component';
import { AuthenticationService } from './auth.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        HttpModule
    ],
    exports: [],
    declarations: [
        AuthenticationComponent],
    providers: [
        AuthenticationService],
})
export class AuthenticationModule { }
