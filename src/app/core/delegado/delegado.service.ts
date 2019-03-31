import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delegado } from './delegado';

@Injectable({
  providedIn: 'root'
})
export class DelegadoService {

  constructor() { }

  getDelegado(id) : Observable<Delegado>{
    return ;
  }
}
