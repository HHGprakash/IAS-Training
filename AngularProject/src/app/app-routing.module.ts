import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Shared/Guard/auth.guard';
import { LoginGuard } from './Shared/Guard/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Component/Auth/login/login.module').then(m => m.LoginModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./Component/Auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'forget-username',
    loadChildren: () => import('./Component/Auth/forget-username/forget-username.module').then(m => m.ForgetUsernameModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'reset-new-password/:id/:LoginToken',
    loadChildren: () => import('./Component/Auth/reset-new-password/reset-new-password.module').then(m => m.ResetNewPasswordModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'ISA',
    loadChildren: () => import('./Component/Safety/safety.module').then(m => m.SafetyModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./Component/Admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'Registraion',
    loadChildren: () => import('./Component/Auth/registration/registration.module').then(m => m.RegistrationModule),
    canLoad: [LoginGuard]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
