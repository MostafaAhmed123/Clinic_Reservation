// doctor-sign-up.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorSignUpService} from '../doctor-sign-up.service'; // Replace with the actual path

@Component({
  selector: 'app-doctor-sign-up',
  templateUrl: './doctor-sign-up.component.html',
  styleUrls: ['./doctor-sign-up.component.scss']
})
export class DoctorSignUpComponent {
  doctorName: string = '';
  doctorUsername: string = '';
  doctorPassword: string = '';
  confirmPassword: string = '';
  doctorSpecialty: string = '';

  constructor(private router: Router, private DoctorSignUpService: DoctorSignUpService) {}

  submitForm() {
    if (this.doctorPassword !== this.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    const doctor = {
      DoctorName: this.doctorName,
      DoctorUserName: this.doctorUsername,
      DoctorHashedPassword: this.doctorPassword,
      DoctorSpecialty: this.doctorSpecialty
    };

    // Call the doctor service to add the doctor
    this.DoctorSignUpService.addDoctor(doctor).subscribe(
      () => {
        alert('Doctor added successfully');
        // Navigate to login page or any other desired page
        this.navigateToHome();
      },
      (error) => {
        alert('Error adding doctor: ' + error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToHome(){
    this.router.navigate(['./doctorHomePage']);
  }
}
