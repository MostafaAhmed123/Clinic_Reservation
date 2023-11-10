import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AppointmentService} from '../patient-home-page.service';
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

  newAppDate: string = '';
  newAppTime: string = '';
  doctor: string = '';

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.getAvailableDoctors();
  }
  getAvailableDoctors() {
    this.appointmentService.getAvailableDoctors().subscribe(
      (doctors) => {
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

  addAppointment(date: string, startTime: string, doctor: string) {
    // You can implement additional validation here
    const appointmentData = {
      patient_username: '',
      doctor_name:doctor ,
      doctor_speciality: '', // You might want to get this from the available doctors list
      date: date,
      StartTime:startTime ,
      EndTime: '', // You can set this based on the doctor's schedule
    };

    this.appointmentService.choose_slot(appointmentData).subscribe(
      () => {
        // Update the appointments list or perform any other action upon successful booking
        console.log('Appointment booked successfully');
        this.closePop();
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
    const confirmation = confirm('Are you sure you want to edit this slot?');
    if (confirmation) {
      // Implement edit logic here if needed
    }
  }

  deleteSlot(appointment: any) {
    const confirmation = confirm('Are you sure you want to delete this slot?');
    if (confirmation) {
      // Implement delete logic here if needed
    }
  }
}