import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { empty, Observable, throwError } from 'rxjs';
import { LoginService } from '../Component/Auth/login/login.service';
import { environment } from '../../environments/environment';
import { disableDebugTools } from '@angular/platform-browser';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private authenticationService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = this.authenticationService.currentUserValue;;   
    if (currentUser) {
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${currentUser.token}`) });
    }
    if (!request.headers.has('content-type')) {
      request.headers.set('content-type', 'application/json');
      request.headers.set('accept', 'application/json, text/plain, */*');
    }
    return next.handle(request).pipe(map(event => {
      return event;
    }), catchError((err:any) => {
      //if (err.status === 401) {
      //  localStorage.removeItem('loginUser');
      // // this._router.navigate(['/login']);
      //  return empty();
      //}
      //else if (err.status === 500) {
      //}
      //else
        return throwError(err);

    }), finalize(() => {
    })
    );
  }

  //intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //  // add authorization header with jwt token if available
  //  let currentUser = this.authenticationService.currentUserValue;
  //  if (currentUser && currentUser.token) {
  //    request = request.clone({
  //      setHeaders: {
  //        Authorization: `Bearer ${currentUser.token}`
  //      }
  //    });
  //  }

  //  return next.handle(request);
  //}

}
