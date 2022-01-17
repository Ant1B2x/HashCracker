import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrackerComponent } from './cracker/cracker.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  { path: '', redirectTo: 'hash', pathMatch: 'full' },
  { path: 'hash', component: CrackerComponent, data: {title: 'ABC'} },
  { path: 'password', component: PasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
