import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delegado } from './delegado';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DelegadoService {

  constructor(private http: HttpClient) { }

  getDelegado(id) : Observable<Delegado>{
    return this.http.get<any>(`${environment.apiBaseUrl}/api/schools/${id}`);
  }

  getCategories() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/categories`);
  }

  createDelegado(delegado){
    return this.http.post<any[]>(`${environment.apiBaseUrl}/api/schools`, delegado);
  }

  getCities(){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/cities?stateAbbreviation=PB`);
  }

  getStates(){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/states`)
  }

  getSchools(){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/schools`);
  }

  editDelegado(id, delegado){
    return this.http.put<any>(`${environment.apiBaseUrl}/api/schools/${id}`,delegado);
  }

  removeDelegado(id){
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/schools/${id}`);
  }

  getLoggedUser(){
    return this.http.get<any>(`${environment.apiBaseUrl}/api/users/data`);
  }

}
