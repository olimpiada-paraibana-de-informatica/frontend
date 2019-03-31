import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.token;
        if (req.url.includes(environment.apiBaseUrl) && token) {
            const cloned = req.clone({ headers: req.headers.set('Authorization', token) });
            return next.handle(cloned);
        }
        return next.handle(req);
    }
}
