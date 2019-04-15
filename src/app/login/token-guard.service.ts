import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../core/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuardService {

  constructor(private auth: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    if (this.auth.isTokenExpired()) {
      this.auth.clearToken();
    }
    return true;
  }
}
