import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SafetyLayoutComponent } from './safety-layout/safety-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SafetyLayoutComponent,
    data: {
      title: 'ISA',
      status: false
    },
    children: [      
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },     
      {
        path: 'Isa',
        loadChildren: () => import('./isa/isa.module').then(m => m.IsaModule),
      },
     
      {
        path: 'Home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafetyRoutingModule { }
