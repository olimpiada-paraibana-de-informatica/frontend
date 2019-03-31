import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';
import { Delegado } from 'src/app/core/delegado/delegado';

@Injectable({
  providedIn: 'root'
})
export class DelegadoResolverService {

  constructor(private delegadoService: DelegadoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Delegado> | Observable<never> {
    const id = route.paramMap.get('delegadoId');
    return this.delegadoService.getDelegado(id);
  }
}
