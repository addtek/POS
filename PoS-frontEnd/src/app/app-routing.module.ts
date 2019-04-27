import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalesComponent } from './components/sales/sales.component';
import { SalesRecordComponent } from './components/sales-record/sales-record.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StockComponent } from './components/stock/stock.component';
import { AdminAuthGuard, WorkerAuthGuard, CanDeactivateGuard } from './_guards';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AllusersComponent } from './components/allusers/allusers.component';


const routes: Routes = [
  {path: '', redirectTo: 'users/authenticate/login', pathMatch: 'full'},
  {path: 'admin', redirectTo: 'users/authenticate/login', pathMatch: 'full'},
  {path: 'users/authenticate/login', component: LoginComponent},
  {path: 'users/password/request-reset', component: ForgotPasswordComponent},
  {path: 'users/authenticate/register', component: RegisterComponent},
  {path: 'app', component: MainComponent, canActivate: [AdminAuthGuard], children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AdminAuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AdminAuthGuard]},
    {path: 'sales-manager', component: SalesComponent, canActivate: [AdminAuthGuard]},
    {path: 'sales-record', component: SalesRecordComponent, canActivate: [AdminAuthGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [AdminAuthGuard]},
    {path: 'stock/management', component: StockComponent, canActivate: [AdminAuthGuard], canDeactivate: [CanDeactivateGuard]},
    {path: 'users/management', component: AllusersComponent, canActivate: [AdminAuthGuard]},
  ]},
  {path: 'app/admin', component: MainComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'sales-manager', component: SalesComponent},
    {path: 'sales-record', component: SalesRecordComponent},
    {path: 'settings', component: SettingsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
