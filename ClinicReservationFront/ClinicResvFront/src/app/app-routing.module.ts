import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DoctorSignUpComponent } from './doctor-sign-up/doctor-sign-up.component';
import { PatientSignUpComponent } from './patient-sign-up/patient-sign-up.component';
import {DoctorHomePageComponent} from './doctor-home-page/doctor-home-page.component'
import {PatientHomePageComponent} from './patient-home-page/patient-home-page.component'
const routes: Routes = [
  {path:'patientSignUp', component:PatientSignUpComponent},
  {path:'', component:HomeComponent},
  {path:'login', component:LoginPageComponent},
  {path:'doctorSignUp', component:DoctorSignUpComponent},
  {path:'doctorHomePage/:id', component:DoctorHomePageComponent},
  {path:'patientHomePage/:username', component: PatientHomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
