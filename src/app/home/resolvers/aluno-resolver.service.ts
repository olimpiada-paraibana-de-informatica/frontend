import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AlunoService} from '../../core/aluno/aluno.service';
import {Aluno} from '../../core/aluno/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoResolverService {

  constructor(private alunoService: AlunoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Aluno> | Observable<never> {
    const id = route.paramMap.get('alunoId');
    return this.alunoService.getAluno(id);
  }
}
