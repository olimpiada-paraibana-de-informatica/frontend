import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetidorService {

  constructor(private http: HttpClient) { }

  getCompetidoresByDelegado(){
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/delegates/competitors`)
  }

}
