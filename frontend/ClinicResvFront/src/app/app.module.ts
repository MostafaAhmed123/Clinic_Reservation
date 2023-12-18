import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModel } from 'src/material.model';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DoctorHomePageComponent } from './doctor-home-page/doctor-home-page.component';
import { PatientHomePageComponent } from './patient-home-page/patient-home-page.component';
import {PatientSignUpComponent} from './patient-sign-up/patient-sign-up.component'
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LoginPageComponent } from './login-page/login-page.component';
import {DoctorSignUpComponent} from './doctor-sign-up/doctor-sign-up.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DoctorHomePageComponent,
    PatientHomePageComponent,
    LoginPageComponent,
    DoctorSignUpComponent,
    PatientSignUpComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModel,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: 'patient-sign-up', component: PatientSignUpComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
