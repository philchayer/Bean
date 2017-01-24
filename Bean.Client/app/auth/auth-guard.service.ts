import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate() {
    if (!this._auth.loggedIn()) {
      this._router.navigate(['']);
      return false;
    }
    return true;
  }

}