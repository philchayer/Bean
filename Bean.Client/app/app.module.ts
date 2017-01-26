import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlantModule } from './plants/plant.module';
import { AuthenticationComponent } from './auth/auth.component';
import { AuthenticationLoginComponent } from './auth/auth-login.component';
import { AuthenticationService } from './auth/auth.service';

import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'login', component: AuthenticationLoginComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    SharedModule,
    PlantModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    AuthenticationLoginComponent
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
