import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './token/token.service';
import { DelegadoService } from './delegado/delegado.service';
import { ResultadoService } from './resultado/resultado.service';
import { GraficoService } from './grafico/grafico.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TokenService,
    DelegadoService, 
    ResultadoService, 
    GraficoService
  ]
  
})
export class CoreModule { }
