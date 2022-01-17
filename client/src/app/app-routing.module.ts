import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrackerComponent } from './cracker/cracker.component';
import { PasswordComponent } from './password/password.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'hash', pathMatch: 'full' },
  { path: 'hash', component: CrackerComponent, data: { title: 'Hash Cracker', description: 'Enter your hashed password and see if your password has been compromised' } },
  { path: 'password', component: PasswordComponent, data: { title: 'Add Password', description: 'Enter a password here to register it in the database' } },
  { path: 'about', component: AboutComponent, data: { title: 'About', description: 'About page...' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
