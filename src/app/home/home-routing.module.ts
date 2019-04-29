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

const routes: Routes = [{
  path: '',
  component: HomePageComponent,
  canActivate: [],
  children: [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    {
      path: 'delegado',
      children: [
        { path: '', component: DelegadoListComponent, canActivate: [PermissionGuardService], data: {  permission: 'I_SC' } },
        { path: 'novo', component: CriarDelegadoComponent, canActivate: [], data: {  permission: 'C_SC' } },
        {
          path: 'editar/:delegadoId',
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
    {path: 'competidor', component: CompetidorComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST'}}
    ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
