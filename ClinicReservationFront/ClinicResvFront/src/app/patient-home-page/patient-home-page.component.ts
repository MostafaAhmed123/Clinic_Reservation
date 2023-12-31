import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../patient-home-page.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-home-page',
  templateUrl: './patient-home-page.component.html',
  styleUrls: ['./patient-home-page.component.scss']
})
export class PatientHomePageComponent implements OnInit {
  appointments: any[] = [];
  availableDoctors: any[] = [];
  show = false;
  showSecondPop = false;
  doctor: string = '';
  doctorSlots: any[] = []; // Declare and initialize doctorSlots here
  selectedSlot: any;
  username: string = '';
  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getAvailableDoctors();
    this.route.params.subscribe(params=>
      {this.username= params['username'];}
      );
    this.getAppointments(); 
  }
  
  getAppointments() {
    this.appointmentService.list_patient_reservations(this.username).subscribe(
      (reservations) => {
        this.appointments = reservations;
      },
      (error) => {
        console.error('Error fetching patient reservations:', error);
      }
    );
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

  openSecondPop() {
    this.showSecondPop = true;
    // Call the viewDoctorSlots method when the second popup is opened
    const selectedDoctor = this.availableDoctors.find(doc => doc.DoctorName === this.doctor);
    if (selectedDoctor) {
        this.appointmentService.viewDoctorSlots(selectedDoctor.DoctorId).subscribe(
            (doctorSlots: any[]) => {
                this.doctorSlots = doctorSlots; // Update doctorSlots with the fetched data
                console.log('Doctor Slots:', this.doctorSlots); // Log doctorSlots for debugging
            },
            (error: any) => {
                console.error('Error fetching doctor slots:', error);
            }
        );
    }
  }
  
  closeSecondPop() {
    this.showSecondPop = false;
  }
  addAppointment(username: string, slot_id: number) {
    // You can implement additional validation here
    console.log(username + slot_id) ;
    this.appointmentService.choose_slot(username, slot_id).subscribe(
      () => {
        this.username = username;
        // Update the appointments list or perform any other action upon successful booking
        console.log('Appointment booked successfully');
        this.closePop();
        this.closeSecondPop(); // Close the second popup after successful booking
        this.getAppointments();
      },
      (error) => {
        console.error('Error booking appointment:', error);
      }
    );
  }
  editSlot(appointment: any) {
    const confirmation = confirm('Are you sure you want to edit this slot?');
  if (confirmation) {
    // Open the first popup to select a new doctor
    this.openPop();
    
    // Set the selected doctor based on the appointment
    this.doctor = appointment.doctor_name;

    // Set the selected slot based on the appointment
    this.selectedSlot = appointment.slot_id;

    // Open the second popup to select a new slot
    this.openSecondPop();
  }
  }
  editAppointment(appointment_id: number, new_slot_id: number) {
    this.appointmentService.editAppointment({
      appointment_id: appointment_id,
      slot_id: new_slot_id
    }).subscribe(
      () => {
        console.log('Appointment edited successfully');
        this.closePop();
        this.closeSecondPop(); // Close the second popup after successful editing
        this.getAppointments();
      },
      (error) => {
        console.error('Error editing appointment:', error);
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  
  deleteSlot(appointment: any) {
    const confirmation = confirm('Are you sure you want to delete this slot?');
    if (confirmation) {
      // Implement delete logic here if needed
    }
  }
}

