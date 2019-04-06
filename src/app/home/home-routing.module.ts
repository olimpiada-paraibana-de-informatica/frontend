import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { DelegadoListComponent } from './delegado/delegado-list/delegado-list.component';
import { CriarDelegadoComponent } from './delegado/criar-delegado/criar-delegado.component';
import { EditarDelegadoComponent } from './delegado/editar-delegado/editar-delegado.component';
import { DelegadoResolverService } from './resolvers/delegado-resolver.service';
import {CriarAlunoComponent} from './aluno/criar-aluno/criar-aluno.component';

const routes: Routes = [{
  path: 'home',
  component: HomePageComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    {
      path: 'delegado',
      children: [
        { path: '', component: DelegadoListComponent, canActivate: [], data: {  } },
        { path: 'novo', component: CriarDelegadoComponent, canActivate: [], data: {  } },
        {
          path: 'editar/:delegadoId',
          component: EditarDelegadoComponent,
          resolve: { delegado: DelegadoResolverService},
          data: { permission: 'U_US' },
          canActivate: []
        }
      ]
    },
    {path: 'aluno',
    children: [
      {path: 'novo', component: CriarAlunoComponent, canActivate: [], data: { }}
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
