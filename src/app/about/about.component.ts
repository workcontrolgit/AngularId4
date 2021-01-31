import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';

import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;
  profileData$: Observable<any>;
  webapiData$: Observable<any>;
  accessToken$: any;
  isAuthenticated$: Observable<boolean>;

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.isAuthenticated$ = this.authservice.isLoggedIn;
    this.profileData$ = this.authservice.userData;
    this.accessToken$ = this.authservice.token;
  }
}
