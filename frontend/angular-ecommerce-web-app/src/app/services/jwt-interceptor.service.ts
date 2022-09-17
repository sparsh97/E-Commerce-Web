import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error('Method not implemented.');
    if(sessionStorage.getItem("token")) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token")!)}`}
      })
    }

    return next.handle(req);
  }

}
