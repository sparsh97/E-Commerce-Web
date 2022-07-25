import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { OktaAuthModule, OKTA_CONFIG,OktaCallbackComponent } from '@okta/okta-angular';
import appConfig from './config/app-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { Router } from '@angular/router';
import { MemberPageComponent } from './components/member-page/member-page.component';


const oktaConfig =  appConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function onAuthRequired(oktaAuth: any, injector: any) {
  // Use injector to access any service available within your application
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MemberPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService,{ provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
