import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutAuthguardService } from '../../Shared/RoutAuthguard/rout-authguard.service';
import { LeftSectionComponent } from '../Left-Section/left-section.component';
const routes: Routes = [
  {
    path: '',
    component: LeftSectionComponent,
    data: {
      title: 'Admin',
      status: false
    },
    children: [
      {
        path: '',
        redirectTo: 'AllContractorTraining',
        pathMatch: 'full',
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin','LtcUser','TrainingOfficer']
        }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin']
        }
      },
      {
        path: 'Admin-panel',
        loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin']
        }
      },
      {
        path: 'LtcUser',
        loadChildren: () => import('./ltc-user/ltc-user.module').then(m => m.LtcUserModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin']
        }
      },
      {
        path: 'ApplicantDetails',
        loadChildren: () => import('./applicant-details/applicant-details.module').then(m => m.ApplicantDetailsModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin']
        }
      },
      {
        path: 'TrainingOfficer',
        loadChildren: () => import('./training-officer/training-officer.module').then(m => m.TrainingOfficerModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin']
        }
      },
      {
        path: 'ContractorTraining',
        loadChildren: () => import('./contractor-training/contractor-training.module').then(m => m.ContractorTrainingModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin','LtcUser','TrainingOfficer']
        }
      },
      {
        path: 'AllContractorTraining',
        loadChildren: () => import('./all-contractor-training/all-contractor-training.module').then(m => m.AllContractorTrainingModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin','LtcUser','TrainingOfficer']
        }
      },
      {
        path: 'ContractorMaster',
        loadChildren: () => import('./contractor-master/contractor-master.module').then(m => m.ContractorMasterModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin']
        }
      },
      {
        path: 'ProgramMaster',
        loadChildren: () => import('./program-master/program-master.module').then(m => m.ProgramMasterModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin']
        }
      },
      {
        path: 'ChangePassword',
        loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin', 'LtcUser', 'TrainingOfficer']
        }
      },
      {
        path: 'ApplicantFinalRanking',
        loadChildren: () => import('./applicant-final-ranking/applicant-final-ranking.module').then(m => m.ApplicantFinalRankingModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin', 'LtcUser', 'TrainingOfficer']
        }
      }, 
       {
        path: 'LtcResult',
         loadChildren: () => import('./ltc-result/ltc-result.module').then(m => m.LtcResultModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin','LtcUser','TrainingOfficer']
        }
      },
      {
        path: 'ViewApplication',
        // path: 'ViewApplication/:applicationid',
        loadChildren: () => import('./view-application/view-applicatio.module').then(m => m.ViewApplicatioModule),
        canActivate: [RoutAuthguardService], data: {
          allowedRoles: ['Admin','LtcUser','TrainingOfficer']
        }
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
