import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName!: string;
  userEmail!: string;
  constructor(
    private okatAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) { }

  ngOnInit(): void {
    this.okatAuthService.authState$.subscribe(result => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    })
  }

  getUserDetails() {
   if(this.isAuthenticated) {
    this.oktaAuth.getUser().then(res => {
      this.userFullName = res.name!
      this.userEmail = res.email!;

      sessionStorage.setItem('userEmail',JSON.stringify(this.userEmail));
    })
   }
  }

  logOut() {
    this.oktaAuth.signOut();
  }

}
