import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  
  private jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  storeToken(token: string) {
    localStorage.setItem('token', `Bearer ${token}`);
  }
  
  setPrivileges (privileges: any[]) {
    const privilegeKeys = privileges.map(privilege => privilege.key);
    localStorage.setItem('privileges', privilegeKeys.toString());
  }
  
  hasPrivilege(privilege: string): boolean {
    const privileges = localStorage.getItem('privileges');
    return privileges.includes(privilege);
  }

  get token() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('privileges');
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token && !this.isTokenExpired();
  }
}
