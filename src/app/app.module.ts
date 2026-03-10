import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutDefaultComponent } from './shared/layout-default/layout-default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { OpdComponent } from './opd/opd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PatientsListComponent } from './patients/patients-list/patients-list.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { PackagesListComponent } from './packages/packages-list/packages-list.component';
import { AddPackageComponent } from './packages/add-package/add-package.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PermissitonComponent } from './permissiton/permissiton.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    // layout components
    LayoutDefaultComponent,
    SidebarComponent,

    DashboardComponent,
    OpdComponent,
    PatientsListComponent,
    AddPatientComponent,
    PackagesListComponent,
    AddPackageComponent,
    PermissitonComponent,
    RoleComponent,
    LoginComponent,
  ],
  
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Material modules
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
    ,MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule
    ,MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule
    ,MatAutocompleteModule
    ,MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
