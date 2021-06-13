import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

import { AuthService } from '@app/auth/auth.service';
import { ProfileStandardClaims } from '@app/models/profile-standard-claims';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;
  isAuthenticated$: Observable<boolean>;
  accessToken$: any;
  profileData$: Observable<ProfileStandardClaims>;

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.isAuthenticated$ = this.authservice.isLoggedIn;
    this.accessToken$ = this.authservice.token;
    this.profileData$ = this.authservice.userData;
  }
}
