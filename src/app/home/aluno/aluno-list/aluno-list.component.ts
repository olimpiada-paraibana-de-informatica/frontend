import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { AlunoService } from 'src/app/core/aluno/aluno.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/token/token.service';
import { Aluno } from 'src/app/core/aluno/aluno';
import { RemoveDialogComponent } from 'src/app/shared/components/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.scss']
})
export class AlunoListComponent implements OnInit {

  displayedColumns: string[] = ['actions','name', 'genre', 'dateBirth'];
  data = new MatTableDataSource([{
    name:"Rubens",
    genre: "Masculino",
    dateBirth: "29/11/1996"
  },{
    name: "Roberta",
    genre:"Feminino",
    dateBirth: "01/01/2001"
  }]);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  rerender = false;
  filter = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private alunoService: AlunoService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private rf: ChangeDetectorRef,
    public tokenService: TokenService
  ) { }

  ngOnInit() {
    this.isLoadingResults = false;
  }

  getAlunos() {
    //todo
  }

  redirectEdit(aluno: Aluno) {
    this.router.navigate(['/home/aluno/editar', aluno.id]);
  }

  openDialogRemove(aluno: Aluno): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        title: 'Remover aluno '+ aluno.name,
        mensagem: 'Tem certeza que deseja remover este aluno?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alunoService.removeAluno(aluno.id).subscribe(res=>{
          this.getAlunos();
          this.openSnackBar("Aluno removido com sucesso", []);
        },err=>{
          this.openSnackBar("Erro ao remover ", []);
        })
      }
    });
  }

  applyFilter(filterValue: string) {
    
    if(!filterValue.trim()){
      this.filter = false;
      this.getAlunos();
    }else{
      this.filter = true;
    }
  }

  async doRerender() {
    this.rerender = true;
    this.rf.detectChanges();
    this.rerender = false;
  }

  openSnackBar(message: string, config) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }

}
