import {Component, OnInit} from '@angular/core';
import {Aluno} from '../../../core/aluno/aluno';
import {AlunoService} from '../../../core/aluno/aluno.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-criar-aluno',
  templateUrl: './criar-aluno.component.html',
  styleUrls: ['./criar-aluno.component.scss']
})
export class CriarAlunoComponent implements OnInit {

  aluno = new Aluno();

  constructor(private alunoService: AlunoService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  createAluno(aluno: Aluno) {
    this.alunoService.createAluno(aluno).subscribe(res => {
      this.openSnackBar('Aluno Cadastrado com sucesso', []);
      this.router.navigate(['home/student']);
    }, err =>{
      if (err._error.errorCode === '') {
        this.openSnackBar(err.error.message, []);
      } else {
        this.openSnackBar('Erro ao cadastrar aluno', []);
      }
    })

  }

  openSnackBar(message: string, config) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }

}
