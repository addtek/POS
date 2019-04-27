import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule,
  MatMenuModule,
  MatSidenavModule,
  MatDividerModule,
  MatPaginatorModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatDialogModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTreeModule,
  MatCardModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatBadgeModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalesRecordComponent } from './components/sales-record/sales-record.component';
import { SalesComponent } from './components/sales/sales.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent, LoadingComponent } from './components/settings/settings.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { SidenavService } from './_services/sideNavService';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { MomentModule } from 'ngx-moment';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MatMomentDateModule} from '@angular/material-moment-adapter';
import { StockComponent } from './components/stock/stock.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AlertComponent } from './_components';
import { ChartViewerComponent } from './components/chart-viewer/chart-viewer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ItemDropComponent } from './components/item-drop/item-drop.component';
import { AllusersComponent } from './components/allusers/allusers.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AlertComponent,
    DashboardComponent,
    SalesRecordComponent,
    SalesComponent,
    RegisterComponent,
    SettingsComponent,
    MenuBarComponent,
    StockComponent,
    LoadingComponent,
    DialogComponent,
    ChartViewerComponent,
    ForgotPasswordComponent,
    UserProfileComponent,
    ItemDropComponent,
    AllusersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTreeModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    HttpClientModule,
    MomentModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBadgeModule,
  ],
  providers: [
    Title,
    SidenavService,
    MenuBarComponent,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  entryComponents: [
    RegisterComponent,
    LoadingComponent,
    DialogComponent,
    ChartViewerComponent,
    ItemDropComponent,
    UserProfileComponent,
    AllusersComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
