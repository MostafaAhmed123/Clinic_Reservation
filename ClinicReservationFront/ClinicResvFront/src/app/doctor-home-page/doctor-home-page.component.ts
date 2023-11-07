import { Component } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-doctor-home-page',
  templateUrl: './doctor-home-page.component.html',
  styleUrls: ['./doctor-home-page.component.scss']
})
export class DoctorHomePageComponent {
  show = false
  openPop(){
    this.show = true
  }
  closePop(){
    this.show = false
  }
  constructor(private router: Router) {} 
navigateToLogin() {
    // Use the Angular Router to navigate to the "patientSignUp" route
    this.router.navigate(['/login']);
  }

  editSlot(slot: any) {
    const confirmation = confirm("Are you sure you want to edit this slot?");
    if (confirmation) {
      // Navigate to the edit page with slot information
      this.router.navigate(['/editSlot', slot.id]); // Modify this based on your routing setup
    }
  }
  deleteSlot(slot: any) {
    const confirmation = confirm("Are you sure you want to delete this slot?");
    if (confirmation) {
      // Implement slot deletion logic here
      // For example, call a service to delete the slot
    }
  }
}
