import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { TokenService } from '../core/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuardService implements CanActivate {

  constructor(private token: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.token.hasPrivilege(route.data.permission)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
