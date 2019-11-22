import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { DelegadoFormComponent } from './delegado/delegado-form/delegado-form.component';
import { DelegadoListComponent } from './delegado/delegado-list/delegado-list.component';
import { CriarDelegadoComponent } from './delegado/criar-delegado/criar-delegado.component';
import { EditarDelegadoComponent } from './delegado/editar-delegado/editar-delegado.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from '../shared/components/header/header.component';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { CompetidorComponent } from './competidor/competidor.component';
import { CompetidorRankComponent } from './competidor/competidor-rank/competidor-rank.component';
import { ResultadoComponent } from './dashboard/resultado/resultado.component';
import { GraficoComponent } from './dashboard/grafico/grafico.component';
import { DataFormComponent } from './data-form/data-form.component';



@NgModule({
  declarations: [HomePageComponent, 
    DashboardComponent, DelegadoFormComponent, DelegadoListComponent, CriarDelegadoComponent, EditarDelegadoComponent, AlunoFormComponent, CompetidorComponent, CompetidorRankComponent, ResultadoComponent, GraficoComponent, DataFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FlexLayoutModule,
  ],
  providers: [AuthGuardService,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class HomeModule { }