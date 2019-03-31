import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './token/token.service';
import { DelegadoService } from './delegado/delegado.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TokenService,
    DelegadoService
  ]
  
})
export class CoreModule { }
