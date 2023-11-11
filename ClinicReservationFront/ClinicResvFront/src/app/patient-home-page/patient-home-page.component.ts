import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../patient-home-page.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.scss']
})
export class PatientHomePageComponent implements OnInit {
  appointments: any[] = [];
  availableDoctors: any[] = [];
  show = false;
  doctor: string = ''; // Declare the 'doctor' property
  newAppDate: string = '';
  newAppTime: string = '';
  selectedDoctor: any = null;  // To store the selected doctor object

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.getAvailableDoctors();
  }
  
  getAppointments() {
    // Implement the logic to fetch appointments
    // You may need to modify your service for this
  }

  getAvailableDoctors() {
    this.appointmentService.getAvailableDoctors().subscribe(
      (doctors) => {
        console.log('Available doctors:', doctors);
        this.availableDoctors = doctors;
      },
      (error) => {
        console.error('Error fetching available doctors:', error);
      }
    );
  }
  
  
  

  openPop() {
    this.show = true;
  }

  closePop() {
    this.show = false;
  }

  addAppointment() {
    if (!this.newAppDate || !this.newAppTime || !this.selectedDoctor) {
      // Add appropriate validation messages or disable the submit button
      return;
    }

    const appointmentData = {
      patient_username: '', // You need to set the patient username here
      doctor_name: this.selectedDoctor.doctorSlotFK__DoctorName,
      doctor_speciality: this.selectedDoctor.doctorSlotFK__DoctorSpecialty,
      date: this.newAppDate,
      StartTime: this.newAppTime,
      EndTime: '',
    };

    this.appointmentService.choose_slot(appointmentData).subscribe(
      () => {
        // Update the appointments list or perform any other action upon successful booking
        console.log('Appointment booked successfully');
        this.closePop();
        this.getAppointments();  // Refresh appointments after booking
      },
      (error) => {
        console.error('Error booking appointment:', error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  editSlot(appointment: any) {
    // Implement edit logic here if needed
  }

  deleteSlot(appointment: any) {
    // Implement delete logic here if needed
  }
}
