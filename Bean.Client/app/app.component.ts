import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'pm-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    pageTitle = 'Plant Me';

    constructor() { }
}
