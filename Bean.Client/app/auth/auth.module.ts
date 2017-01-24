import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [],
    providers: [
        AUTH_PROVIDERS,
        AuthService,
        AuthGuard
    ],
})
export class AuthModule { }
