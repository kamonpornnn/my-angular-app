import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patients } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private baseUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patients[]> {
    return this.http.get<Patients[]>(this.baseUrl);
  }

  addPatient(p: Patients): Observable<Patients> {
    return this.http.post<Patients>(this.baseUrl, p);
  }
}
