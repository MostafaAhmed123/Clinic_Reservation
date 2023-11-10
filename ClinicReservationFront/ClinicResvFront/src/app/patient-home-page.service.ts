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
    return this.http.get<any[]>(`${this.apiUrl}/listDoctors`); // Update the URL if needed
  }

  choose_slot(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chooseSlot`, appointmentData);
  }

}
