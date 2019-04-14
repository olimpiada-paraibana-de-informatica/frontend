import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Aluno} from './aluno';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) {
  }

  getAluno(id): Observable<Aluno> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/students/${id}`);
  }

  createAluno(aluno) {
    return this.http.post<any[]>(`${environment.apiBaseUrl}/api/students`, aluno);
  }

  editAluno(id, aluno) {
    return this.http.put<any>(`${environment.apiBaseUrl}/api/students/${id}`, aluno);
  }

  removeAluno(id) {
    return this.http.delete(`${environment.apiBaseUrl}/api/students/${id}`);
  }

  getGenders() {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/genres`);
  }

}
