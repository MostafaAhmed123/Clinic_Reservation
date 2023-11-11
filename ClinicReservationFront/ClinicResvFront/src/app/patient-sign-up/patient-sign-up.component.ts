// patient-sign-up.component.ts
import { Component } from '@angular/core';
import { PatientSignUpService } from '../patient-sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-sign-up',
  templateUrl: './patient-sign-up.component.html',
  styleUrls: ['./patient-sign-up.component.scss']
})
export class PatientSignUpComponent {
  PatientName: string = '';
  PatientUserName: string = '';
  PatientHashedPassword:string = '';
  confirmPassword:string = '';
  PatientMdedicalHistory:string = '';

  constructor(private router: Router, private PatientSignUpService: PatientSignUpService ) {}

  proceedPatientSignUp() {
    if (this.PatientHashedPassword !== this.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    const patient = {
      PatientName: this.PatientName,
      PatientUserName: this.PatientUserName,
      PatientHashedPassword: this.PatientHashedPassword,
      PatientMdedicalHistory: this.PatientMdedicalHistory
    };

    console.log('Patient Data:', patient);

this.PatientSignUpService.addPatient(patient).subscribe(
    () => {
        const username = patient.PatientUserName;
        console.log('Registration Successful');
        alert('Registered Successfully');
        console.log(username);
        this.router.navigate(['./patientHomePage', username]);
    },
    (error) => {
        console.error('Error adding patient:', error);
        alert('Error adding patient: ' + error);
    }
);

  
    }
    navigateToLogin() {
    this.router.navigate(['/login']);
  }
}