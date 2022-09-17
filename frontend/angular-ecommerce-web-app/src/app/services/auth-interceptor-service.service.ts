// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Inject, Injectable } from '@angular/core';
// import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
// import { from, Observable } from 'rxjs';
// import { OktaAuth } from '@okta/okta-auth-js';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorServiceService implements HttpInterceptor {

//   constructor(
//     private oktaAuthState: OktaAuthStateService,
//     @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
//   ) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return from(this.handleAccess(req,next));
//   }

//   private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
//     const secureEndPoints = ['http://localhost:8080/api/orders'];
//     if(secureEndPoints.some(url=> request.urlWithParams.includes(url))) {
//       const accessToken = await this.oktaAuth.getAccessToken();

//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ` + accessToken
//         }
//       });
//     }

//     return next.handle(request).toPromise();

//   }

// }
