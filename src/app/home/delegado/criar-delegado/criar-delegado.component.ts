import { Component, OnInit } from '@angular/core';
import { Delegado } from 'src/app/core/delegado/delegado';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TokenService } from 'src/app/core/token/token.service';

@Component({
  selector: 'app-criar-delegado',
  templateUrl: './criar-delegado.component.html',
  styleUrls: ['./criar-delegado.component.scss']
})
export class CriarDelegadoComponent implements OnInit {

  delegado = new Delegado();
  constructor(private delegadoService: DelegadoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private tokenService: TokenService) { }

  ngOnInit() {
  }

  createDelegado(delegado: Delegado) {
    this.delegadoService.createDelegado(delegado).subscribe(res=>{
      this.openSnackBar("Escola cadastrada com sucesso", []);
      if (this.tokenService.hasPrivilege('I_SC')) 
        {this.router.navigate(["/delegado"]); }
      else { this.router.navigate(["/"])}
    },err=>{
      
      if(err.error.errorCode === "DELEGATE_ALREADY_EXISTS"){
        this.openSnackBar(err.error.message, []);
      }else{
        this.openSnackBar("Erro ao cadastrar escola", []);
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
