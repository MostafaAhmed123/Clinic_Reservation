// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environment/environment'

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  url = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  list_doctor_names_specialties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/patient/listDoctors`);
  }

  getAvailableDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/api/patient/listDoctors`);
  }

  choose_slot(patient_username: string, slot_id: number): Observable<any> {
    const appointmentData = {
      patient_username: patient_username,
      slot_id: slot_id,
    };
    console.log('Request Payload:', appointmentData); // Log the payload

    return this.http.post(`${this.url}/api/patient/chooseSlot`, appointmentData);
  }

  viewDoctorSlots(doctorId: number): Observable<any[]> {
    const url = `${this.url}/api/patient/viewDoctorSlots`;
    return this.http.get<any[]>(`${url}?doctorId=${doctorId}`);
  }
  list_patient_reservations(patient_username: string): Observable<any[]> {
    const url = `${this.url}/api/patient/listReservations`;
    return this.http.get<any[]>(`${url}?patient_username=${patient_username}`);
  }
  editAppointment(appointment_id: number, new_slot_id :number): Observable<any> {
    const body ={
      appointment_id: appointment_id,
      slot_id: new_slot_id
    };
    console.log(body)
    return this.http.put(`${this.url}/api/patient/editAppointment`, body);
  }

  cancelAppointment(patientUsername: string, appointmentId: number): Observable<any> {
    const body = {
      patientUsername: patientUsername,
      appointmentId: appointmentId,
    };

    return this.http.delete(`${this.url}/api/patient/cancelAppointment`,  body );
  }
}

