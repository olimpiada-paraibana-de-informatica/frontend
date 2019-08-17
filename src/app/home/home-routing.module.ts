import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { PermissionGuardService } from './permission-guard.service';
import { DelegadoListComponent } from './delegado/delegado-list/delegado-list.component';
import { CriarDelegadoComponent } from './delegado/criar-delegado/criar-delegado.component';
import { EditarDelegadoComponent } from './delegado/editar-delegado/editar-delegado.component';
import { DelegadoResolverService } from './resolvers/delegado-resolver.service';
import { AlunoResolverService } from './resolvers/aluno-resolver.service';
import { AlunoFormComponent } from './aluno/aluno-form/aluno-form.component';
import { CompetidorComponent } from './competidor/competidor.component';
import { CompetidorRankComponent } from './competidor/competidor-rank/competidor-rank.component';

const routes: Routes = [{
  path: '',
  component: HomePageComponent,
  canActivate: [],
  children: [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    {
      path: 'escolas',
      children: [
        { path: '', component: DelegadoListComponent, canActivate: [PermissionGuardService], data: {  permission: 'I_SC' } },
        { path: 'novo', component: CriarDelegadoComponent, canActivate: [], data: {  permission: 'C_SC' } },
        {
          path: 'delegado/editar/:delegadoId',
          component: EditarDelegadoComponent,
          resolve: { delegado: DelegadoResolverService},
          data: { permission: 'UA_SC' },
          canActivate: [PermissionGuardService]
        }
      ]
    },
    {path: 'aluno',
    children: [
      {path: 'novo', component: AlunoFormComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST'},},
    ],
    },
    {path: 'competidor', children:[
      {path:'iniciacao1', component: CompetidorComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST', value:'Iniciação 1'}},
      {path:'iniciacao2', component: CompetidorComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST', value:'Iniciação 2'}},
      {path:'programacao', component: CompetidorComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST', value:'Programação'}},
      {path:'avancadojunior', component: CompetidorComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST', value:'Avançado Junior'}},
      {path:'avancadosenior', component: CompetidorComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST', value:'Avançado Senior'}},
      {path: 'ranking', 
      children:[
        { path:'iniciacao1',component: CompetidorRankComponent, canActivate: [PermissionGuardService], data: { permission: 'I_CO', value:'Iniciação 1'}},
        { path:'iniciacao2',component: CompetidorRankComponent, canActivate: [PermissionGuardService], data: { permission: 'I_CO', value:'Iniciação 2'}},
        { path:'programacao',component: CompetidorRankComponent, canActivate: [PermissionGuardService], data: { permission: 'I_CO', value:'Programação'}},
        { path:'avancadojunior',component: CompetidorRankComponent, canActivate: [PermissionGuardService], data: { permission: 'I_CO', value:'Avançado Junior'}},
        { path:'avancadosenior',component: CompetidorRankComponent, canActivate: [PermissionGuardService], data: { permission: 'I_CO', value:'Avançado Senior'}}
      ]},
    ],
    },
    
    ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
