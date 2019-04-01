import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delegado } from './delegado';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DelegadoService {

  constructor(private httpClient: HttpClient) { }

  getDelegado(id) : Observable<Delegado>{
    return ;
  }

  getCategories() : any {
    return this.httpClient.get(environment.apiBaseUrl + '/api/categories');
  }

}
