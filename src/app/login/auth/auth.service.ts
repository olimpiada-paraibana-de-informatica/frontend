import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TokenService } from 'src/app/core/token/token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private tokenService: TokenService) {
  }
  
  login({ email, password }, callback?: (any?: any) => void, error?: (msg: string) => void) {
    const credentials = { username: email, password };
    this.http.post<any>(`${environment.apiBaseUrl}/api/users/login`, credentials, { observe: 'response' }).subscribe(data => {
      const token = data.headers.get('authorization');
      const privileges = data.body.profile.privileges;
      this.tokenService.storeToken(token);
      this.tokenService.setPrivileges(privileges);
      if (callback) {
        callback(data.body);
      }
    }, e => {
      console.log(e);
      if (error) {
        if (e.status === 404) {
          error('Usuário ou senha incorretos');
        } else {
          error('Ocorreu um erro ao entrar, tente novamente');
        }
      }
    });
  }}
