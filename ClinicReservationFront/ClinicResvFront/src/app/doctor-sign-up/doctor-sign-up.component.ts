import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-sign-up',
  templateUrl: './doctor-sign-up.component.html',
  styleUrls: ['./doctor-sign-up.component.scss']
})
export class DoctorSignUpComponent {
  constructor(private router: Router) {} 
  navigateToLogin() {
    // Use the Angular Router to navigate to the "patientSignUp" route
    this.router.navigate(['/login']);
  }
}
