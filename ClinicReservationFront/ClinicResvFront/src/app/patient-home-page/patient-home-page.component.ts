import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../patient-home-page.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


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
  showEdit=false;
  showSecondEdit=false;
  selectedAppointmentId: number | null = null;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAvailableDoctors();
    this.route.params.subscribe(params=>
      {this.username= params['username'];}
      );
    this.getAppointments(); 
    this.selectedSlot='';
  }
  openPopEdit(){
    this.showEdit=true;
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
  
          // Set the selected slot based on the appointment
          this.selectedSlot = doctorSlots[0].SlotId;
        },
        (error: any) => {
          console.error('Error fetching doctor slots:', error);
        }
      );
    }
  }
  openSecondEdit(){
    this.showSecondEdit=true;
    const selectedDoctor = this.availableDoctors.find(doc => doc.DoctorName === this.doctor);
    if (selectedDoctor) {
      this.appointmentService.viewDoctorSlots(selectedDoctor.DoctorId).subscribe(
        (doctorSlots: any[]) => {
          this.doctorSlots = doctorSlots; // Update doctorSlots with the fetched data
          console.log('Doctor Slots:', this.doctorSlots); // Log doctorSlots for debugging
  
          // Set the selected slot based on the appointment
          this.selectedSlot = doctorSlots[0].SlotId;
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
  closeEdit() {
    this.showEdit = false;
  }
  closeSecondPopEdit() {
    this.showSecondEdit = false;
  }
  addAppointment(username: string, slot_id: number) {
    // You can implement additional validation here
    console.log(username + slot_id);
  
    this.appointmentService.choose_slot(username, slot_id).subscribe(
      () => {
        this.username = username;
        // Update the appointments list or perform any other action upon successful booking
        console.log('Appointment booked successfully');
        this.toastr.success('Appointment booked successfully!', 'Success');

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
      this.selectedAppointmentId = appointment.appointment_id; // Store the appointment_id
  
      // Open the first popup to select a new doctor
      this.openPopEdit();
  
      // Set the selected doctor based on the appointment
      this.doctor = appointment.doctor_name;
  
      // Set the selected slot based on the appointment
      this.selectedSlot = appointment.slot_id;
  
      // Open the second popup to select a new slot
      this.openSecondEdit();
    }
  }
  editAppointment() {
    const appointment_id: number = this.selectedAppointmentId as number;
      this.appointmentService.editAppointment(appointment_id, this.selectedSlot).subscribe(
        () => {
          // Existing appointment edited successfully
          console.log('Appointment edited successfully');
          this.toastr.success('Appointment Edited successfully!', 'Success');

          // Close the popups or perform any other actions needed
          this.closeSecondPopEdit();
          this.closeEdit();
          this.getAppointments();

        },
        (error) => {
          console.error('Error editing appointment:', error);
        }
      );
  }
  refreshPatientAppointments() {
    // Fetch the updated patient appointments
    this.appointmentService.list_patient_reservations(this.username).subscribe(
      (reservations) => {
        this.appointments = reservations; // Update appointments with the fetched data
        console.log('Patient Appointments:', this.appointments); // Log appointments for debugging
      },
      (error) => {
        console.error('Error fetching patient appointments:', error);
      }
    );
  }
  refreshDoctorSlots(newSlotId: number) {
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
  navigateToLogin() {
    this.router.navigate(['']);
  }
  
  deleteSlot(appointment: any) {
    console.log('Deleting slot:', appointment);
    const confirmation = confirm('Are you sure you want to Delete this Appointment?');
    
    if(confirmation){
    this.appointmentService.cancelAppointment(this.username, appointment.appointment_id).subscribe(
      () => {
        console.log('Appointment canceled successfully');
        this.toastr.success('Appointment Canceled successfully!', 'Success');
        this.getAppointments(); 
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error canceling appointment:', error);
      }
      
    );
  }
}
  
}
