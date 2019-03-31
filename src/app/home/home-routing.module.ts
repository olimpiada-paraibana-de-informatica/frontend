import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';
import { DelegadoListComponent } from './delegado/delegado-list/delegado-list.component';
import { CriarDelegadoComponent } from './delegado/criar-delegado/criar-delegado.component';
import { EditarDelegadoComponent } from './delegado/editar-delegado/editar-delegado.component';

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
          resolve: { },
          data: { permission: 'U_US' },
          canActivate: []
        }
      ]
    }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
