import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget';
import appConfig from 'src/app/config/app-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  oktaSignin: any;
  loginForm!: FormGroup;
  constructor(
    // private okatAuthService: OktaAuthStateService,
    // @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    private router: Router,
    private loginService: LoginService
  ) {
    // this.oktaSignin = new OktaSignIn({
    //   logo: 'assets/image/logo.png',
    //   baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
    //   clientId: appConfig.oidc.clientId,
    //   redirectUri: appConfig.oidc.redirectUri,
    //   authParams: {
    //     pkce: true,
    //     issuer: appConfig.oidc.issuer,
    //     scopes: appConfig.oidc.scopes,
    //   },
    // });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)])
    }
    )
    // this.oktaSignin.remove();
    // this.oktaSignin.renderEl(
    //   {
    //     el: '#okta-sign-in-widget',
    //   },
    //   (response: any) => {
    //     if (response?.status === 'SUCCESS') {
    //       this.oktaAuth.signInWithRedirect();
    //     }
    //   },
    //   (error: any) => {
    //     throw error;
    //   }
    // );
  }

  signUp() {
    this.router.navigateByUrl("/sign-up");
  }

  onLogin() {
    let obj = {...this.loginForm.value};
    this.loginService.login(obj).subscribe(res => {
      sessionStorage.setItem("token",JSON.stringify(res['token']))
    });
    this.router.navigateByUrl("/products");
  }
}
