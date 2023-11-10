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
    patientName: string = '';
    patientUserName: string = '';
    patientHashedPassword:string = '';
    confirmPassword:string = '';
    patientMedicalHistory:string = '';

  constructor(private router: Router, private PatientSignUpService: PatientSignUpService ) {}

  proceedPatientSignUp() {
    if (this.patientHashedPassword !== this.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    const patient = {
      patientName: this.patientName,
      patientUserName: this.patientUserName,
      patientHashedPassword: this.patientHashedPassword,
      patientMedicalHistory: this.patientMedicalHistory
    };

      this.PatientSignUpService.addPatient(patient).subscribe(
        () => {
          alert('Registered Successfully');
          this.router.navigate(['./patientHomePage']);
        },
        (error) => {
          alert('Error adding patient: ' + error);
        }
      );
    }
    navigateToLogin() {
    this.router.navigate(['/login']);
  }
  }
