import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@core';
import { CredentialsService } from './credentials.service';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if (this.credentialsService.isAuthenticated()) {
    //   return true;
    // }

    this.isAuthenticated$ = this.authService.isLoggedIn;
    this.isAuthenticated$.subscribe((data: boolean) => {
      log.debug('AuthenticationGuard - canActivate - line 32 - this.isAuthenticated$.subscribe ', data);
      this.isAuthenticated = data;
      //return true;
    });

    if (this.isAuthenticated) {
      return true;
    } else {
      log.debug('Not authenticated, redirecting and adding redirect url...');
      this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
      return false;
    }
  }
}
