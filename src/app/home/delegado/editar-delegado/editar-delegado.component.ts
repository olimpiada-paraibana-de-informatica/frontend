import { Component, OnInit } from '@angular/core';
import { Delegado } from 'src/app/core/delegado/delegado';
import { ActivatedRoute, Router } from '@angular/router';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editar-delegado',
  templateUrl: './editar-delegado.component.html',
  styleUrls: ['./editar-delegado.component.scss']
})
export class EditarDelegadoComponent implements OnInit {

  delegado = new Delegado();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private delegadoService: DelegadoService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.delegado = data.delegado;
      this.delegado.email = data.delegado.username;
    });
  }

  editdelegado(delegado: Delegado) {
      this.openSnackBar('Delegado '+delegado.name+' editado com sucesso');
  }

  openSnackBar(message: string, config?) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }

}
