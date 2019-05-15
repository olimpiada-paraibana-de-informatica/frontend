import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/token/token.service';
import { Delegado } from 'src/app/core/delegado/delegado';
import { RemoveDialogComponent } from 'src/app/shared/components/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-delegado-list',
  templateUrl: './delegado-list.component.html',
  styleUrls: ['./delegado-list.component.scss']
})
export class DelegadoListComponent implements OnInit {

  displayedColumns: string[] = ['actions','schoolName', 'name', 'email', 'filed'];
  data = new MatTableDataSource([{
    firstName:"Wesley",
    username: "wesley.anibal@ccc.ufcg.edu.br",
    schoolName: "UFCG"
  },{
    firstName: "teste",
    username:"teste@teste.com",
    schoolName: "UEPB"
  }]);
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  rerender = false;
  filter = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private delegadoService: DelegadoService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private rf: ChangeDetectorRef,
    public tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getUsers();
  }
  
  getUsers() {
    this.delegadoService.getSchools().subscribe(res=>{
      this.data = new MatTableDataSource(res["content"]);
      this.data.paginator = this.paginator;
      this.rerender = true;
      this.rf.detectChanges();
      this.rerender = false;
      this.isLoadingResults = false;
    })
      
  }

  redirectEdit(delegado: Delegado) {
    this.router.navigate(['/home/delegado/editar', delegado.id]);
  }
  

  openDialogRemove(delegado): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        title: 'Remover escola '+ delegado.schoolName,
        mensagem: 'Tem certeza que deseja remover essa escola?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delegadoService.removeDelegado(delegado.id).subscribe(res=>{
          this.getUsers();
          this.openSnackBar("Escola removida com sucesso", []);
        },err=>{
          this.openSnackBar("Erro ao remover ", []);
        })
      }
    });
  }

  applyFilter(filterValue: string) {
    
    if(!filterValue.trim()){
      this.filter = false;
      this.getUsers();
    }else{
      this.filter = true;
      /*this.delegadoService.filterUser(filterValue.trim().toLowerCase()).subscribe(res=>{
        this.data.data = res;
      })*/
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
