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
import {CriarAlunoComponent} from './aluno/criar-aluno/criar-aluno.component';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';
import { EditarAlunoComponent } from './aluno/editar-aluno/editar-aluno.component';
import { AlunoResolverService } from './resolvers/aluno-resolver.service';

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
      {path: '', component: AlunoListComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST'}},
      {path: 'novo', component: CriarAlunoComponent, canActivate: [PermissionGuardService], data: { permission: 'IA_ST'}},
      {
        path: 'editar/:alunoId',
        component: EditarAlunoComponent,
        resolve: { aluno: AlunoResolverService},
        data: { permission: 'UA_SC' },
        canActivate: [PermissionGuardService]
      }
    ]
    }
    ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
