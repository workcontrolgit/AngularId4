import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  isAuthenticated$: Observable<boolean>;
  url: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isLoggedIn;
  }

  login() {
    log.debug('login');
    this.authService.doLogin();
  }

  logout() {
    // this.url = '/login';
    // this.authService.signOut(this.url);
    log.debug('logout');
    this.authService.signOut();
  }
}
