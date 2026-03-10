import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutDefaultComponent } from './shared/layout-default/layout-default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OpdComponent } from './opd/opd.component';
import { PatientsListComponent } from './patients/patients-list/patients-list.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { PackagesListComponent } from './packages/packages-list/packages-list.component';
import { AddPackageComponent } from './packages/add-package/add-package.component';
import { PermissitonComponent } from './permissiton/permissiton.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'opd', component: OpdComponent },
      { path: 'patients', component: PatientsListComponent },
      { path: 'patients/add', component: AddPatientComponent },
      { path: 'packages', component: PackagesListComponent },
      { path: 'packages/add', component: AddPackageComponent },
      { path: 'permissions', component: PermissitonComponent },
      { path: 'permissions/:id', component: PermissitonComponent },
      { path: 'roles', component: RoleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
