import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthenticationLoginComponent } from './auth-login.component';
import { AuthenticationComponent } from './auth.component';
import { AuthenticationService } from './auth.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        HttpModule,
        RouterModule.forChild([
            { path: 'login', component: AuthenticationLoginComponent }
        ])
    ],
    exports: [],
    declarations: [
        AuthenticationComponent,
        AuthenticationLoginComponent
    ],
    providers: [
        AuthenticationService],
})
export class AuthenticationModule { }
