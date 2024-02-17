import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RoutAuthenticateServiceService } from '../../Component/Auth/rout-authenticate-service/rout-authenticate-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoutAuthguardService implements CanActivate{

  constructor(private router: Router, private authenticationService: RoutAuthenticateServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      //debugger;
      // User is logged in

      // Check if the user's role has access to the route
      const allowedRoles: string[] = route.data.allowedRoles; // Define allowed roles for the route
      const userRole = currentUser.userRoleName; // Assuming the role is stored in the currentUser object

      if (allowedRoles.includes(userRole)) {
        // User's role is allowed, allow access to the route
        return true;
      } else {
        // User's role is not allowed, redirect to unauthorized page or show an error message
        this.router.navigate(['/login']);
        return false;
      }
    }

    // User is not logged in, redirect to the login page with the return URL
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
