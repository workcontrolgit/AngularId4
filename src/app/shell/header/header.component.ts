import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { AuthService } from '@app/auth/auth.service';
import {ProfileStandardClaims} from '@app/models/profile-standard-claims';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  url: string;
  profileData$: Observable<ProfileStandardClaims>;
  name: string;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authService.signOut();
  }

  get username(): string | null {
    this.profileData$ = this.authService.userData;
    this.profileData$.subscribe(
      data => 
      {
        this.name = data.name;
        console.log (this.name)
      }
    )
    return this.name ? this.name : null;


  }
}
