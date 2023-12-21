// doctor-home-page.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorHomePageService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = this.getBaseURL();
  }
  getBaseURL(): Observable<string>{
    return this.http.get<any>('../assets/cofig.json');
  }
  createSlot(slotData: any): Observable<any> {
    const url = `${this.baseUrl}/createSlot`;
    return this.http.post(url, slotData);
  }

  getAllSlots(id: number): Observable<any> {
    const url = `${this.baseUrl}/listDoctorsSlot`;
    return this.http.get(`${url}?id=${id}`);
  }
  deleteSlot(id: number): Observable<any> {
    const url = `${this.baseUrl}/deleteSlot`;
    return this.http.delete(`${url}?id=${id}`);
  }
  editSlot(updatedSlot: any): Observable<any> {
    const url = `${this.baseUrl}/editSlot`;
    return this.http.put(url, updatedSlot);
  }
}
