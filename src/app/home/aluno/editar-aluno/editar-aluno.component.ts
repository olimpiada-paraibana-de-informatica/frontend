import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/core/aluno/aluno';
import { AlunoService } from 'src/app/core/aluno/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.scss']
})
export class EditarAlunoComponent implements OnInit {

  aluno = new Aluno();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  editAluno(aluno: Aluno) {
    this.alunoService.editAluno(aluno.id, aluno).subscribe(res=>{
      this.openSnackBar('Aluno '+aluno.name+' editado com sucesso');
      this.router.navigate(["/home/aluno"]);
    },err=>{
      console.log(err);
    })
  }

  openSnackBar(message: string, config?) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }

}
