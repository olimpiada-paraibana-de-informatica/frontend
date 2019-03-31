import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [{
  path: 'home',
  component: HomePageComponent,
  canActivate: [AuthGuardService],
  children: [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
