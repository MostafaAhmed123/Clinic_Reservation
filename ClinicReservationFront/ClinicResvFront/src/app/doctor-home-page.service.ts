// doctor-home-page.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class DoctorHomePageService {
  url = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  createSlot(slotData: any): Observable<any> {
    const url = `${this.url}/api/doctor/createSlot`;
    return this.http.post(url, slotData);
  }

  getAllSlots(id: number): Observable<any> {
    const url = `${this.url}/api/doctor/listDoctorsSlot`;
    return this.http.get(`${url}?id=${id}`);
  }
  deleteSlot(id: number): Observable<any> {
    const url = `${this.url}/api/doctor/deleteSlot`;
    return this.http.delete(`${url}?id=${id}`);
  }
  editSlot(updatedSlot: any): Observable<any> {
    const url = `${this.url}/api/doctor/editSlot`;
    return this.http.put(url, updatedSlot);
  }
}