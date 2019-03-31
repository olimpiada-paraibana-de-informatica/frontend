import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MAT_DATE_LOCALE } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { EscolasComponent } from './escolas/escolas.component';

@NgModule({
  declarations: [HomePageComponent, 
    DashboardComponent, EscolasComponent, ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [AuthGuardService,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class HomeModule { }
