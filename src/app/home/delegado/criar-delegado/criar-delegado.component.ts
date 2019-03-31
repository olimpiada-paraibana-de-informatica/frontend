import { Component, OnInit } from '@angular/core';
import { Delegado } from 'src/app/core/delegado/delegado';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-criar-delegado',
  templateUrl: './criar-delegado.component.html',
  styleUrls: ['./criar-delegado.component.scss']
})
export class CriarDelegadoComponent implements OnInit {

  delegado = new Delegado();
  constructor(private delegadoService: DelegadoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  createDelegado(delegado: Delegado) {
    console.log("criando delegado "+ delegado.email);
  }

  openSnackBar(message: string, config) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }

}
