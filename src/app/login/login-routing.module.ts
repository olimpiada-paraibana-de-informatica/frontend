import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { TokenGuardService } from './token-guard.service';

const routes: Routes = [{
  path: '',
  component: LoginPageComponent,
  canActivate: [ ]
}];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }