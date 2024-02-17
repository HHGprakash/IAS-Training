import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../Component/Auth/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(
    private router: Router,
    private authenticationService: LoginService
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      localStorage.removeItem('currentUser');
      this.authenticationService.setCurrentUserValue(null);
      this.router.navigate(["login"]);
      return false;
    }
    return true;    
  }
}
