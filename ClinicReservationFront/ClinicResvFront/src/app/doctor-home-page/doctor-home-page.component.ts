import { Component } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-doctor-home-page',
  templateUrl: './doctor-home-page.component.html',
  styleUrls: ['./doctor-home-page.component.scss']
})
export class DoctorHomePageComponent {
  newSlotDate: string='';
  newSlotStartTime: string='';
  newSlotEndTime: string='';

  slots: any[]=[];
  show = false
  openPop(){
    this.show = true
  }
  closePop(){
    this.show = false
  }
  constructor(private router: Router) {} 
  addSlot(date: string, startTime: string, endTime: string) {
    
    // Check if the start date and time are in the past
  if (this.isPastDateTime(date, startTime)) {
    alert('Cannot add a slot with a past date and time.');
    return;
  }

  // Check if the end date and time are in the past
  if (this.isPastDateTime(date, endTime)) {
    alert('Cannot add a slot with a past date and time.');
    return;
  }
    // Check if the slot is available based on the existing slots data
    const isSlotAvailable = this.isSlotAvailable(date, startTime, endTime);
  
    if (isSlotAvailable) {
      const newSlot = { date, startTime, endTime };
      this.slots.push(newSlot);
      this.closePop();
    } else {
      // Provide feedback to the user that the slot is not available
      alert('The selected slot is not available. Please choose another slot.');
    }
  }
  
  isSlotAvailable(date: string, startTime: string, endTime: string): boolean {
    // Loop through existing slots to check availability
    for (const slot of this.slots) {
      if (
        slot.date === date &&
        this.isTimeRangeOverlap(startTime, endTime, slot.startTime, slot.endTime)
      ) {
        // Slot is not available if there is an overlap in time range
        return false;
      }
    }
  
    // Slot is available if no overlapping time range is found
    return true;
  }
  
  isTimeRangeOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
    // Check if two time ranges overlap
    const startTime1 = new Date(`2000-01-01T${start1}`);
    const endTime1 = new Date(`2000-01-01T${end1}`);
    const startTime2 = new Date(`2000-01-01T${start2}`);
    const endTime2 = new Date(`2000-01-01T${end2}`);
  
    return startTime1 < endTime2 && endTime1 > startTime2;
  }
  isPastDateTime(date: string, time: string): boolean {
    const currentDateTime = new Date();
    const inputDateTime = new Date(`${date}T${time}`);
  
    return currentDateTime > inputDateTime;
  }
  
navigateToLogin() {
    // Use the Angular Router to navigate to the "patientSignUp" route
    this.router.navigate(['/login']);
  }

  editSlot(slot: any) {
    const confirmation = confirm("Are you sure you want to edit this slot?");
    if (confirmation) {
      // Implement edit logic here if needed
    }
  }
  deleteSlot(slot: any) {
    const confirmation = confirm("Are you sure you want to delete this slot?");
    if (confirmation) {
      const index = this.slots.indexOf(slot);
      if (index !== -1) {
        this.slots.splice(index, 1);
      }
    }
  }
}
