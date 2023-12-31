// appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://127.0.0.1:8000/patient';

  constructor(private http: HttpClient) {}

  list_doctor_names_specialties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listDoctors`);
  }

  getAvailableDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listDoctors`);
  }

  choose_slot(patient_username: string, slot_id: number): Observable<any> {
    const appointmentData = {
      patient_username: patient_username,
      slot_id: slot_id,
    };

    return this.http.post(`${this.apiUrl}/chooseSlot`, appointmentData);
  }

  viewDoctorSlots(doctorId: number): Observable<any[]> {
    const url = `${this.apiUrl}/viewDoctorSlots`;
    return this.http.get<any[]>(`${url}?doctorId=${doctorId}`);
  }
  list_patient_reservations(patient_username: string): Observable<any[]> {
    const url = `${this.apiUrl}/listReservations`;
    return this.http.get<any[]>(`${url}?patient_username=${patient_username}`);
  }
  editAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/editAppointment`, appointmentData);
  }
  // deleteAppointment(appointmentData: any): Observable<any>{
  //   return this.http.delete(`${this.apiUrl}`)
  // }
  cancelAppointment(patientUsername: string, appointmentId: number): Observable<any> {
    const cancelData = {
      patientUsername: patientUsername,
      appointmentId: appointmentId,
    };

    return this.http.delete(`${this.apiUrl}/cancelAppointment`, { body: cancelData });
  }
}
