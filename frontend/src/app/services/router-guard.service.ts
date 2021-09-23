import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RouterGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate() {
    console.log('Always logged');
    return true;
  }
}
