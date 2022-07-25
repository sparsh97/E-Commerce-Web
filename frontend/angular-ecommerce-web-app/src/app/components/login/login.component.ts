import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';
import appConfig from 'src/app/config/app-config';
import { OktaAuth } from '@okta/okta-auth-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  oktaSignin: any;
  constructor(
    private okatAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/image/logo.png',
      baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
      clientId: appConfig.oidc.clientId,
      redirectUri: appConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: appConfig.oidc.issuer,
        scopes: appConfig.oidc.scopes,
      },
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl(
      {
        el: '#okta-sign-in-widget',
      },
      (response: any) => {
        if (response?.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }
}
