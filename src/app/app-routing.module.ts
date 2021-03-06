import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []})
export class AppRoutingModule { }
