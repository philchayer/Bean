import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
    moduleId: module.id,
    selector: 'pm-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    pageTitle = 'Plant Me';

    constructor(private _authService: AuthService) {

    }
}
