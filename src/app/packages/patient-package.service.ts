import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientPackage } from '../models/patient-package.model';

@Injectable({ providedIn: 'root' })
export class PatientPackageService {
  private baseUrl = 'http://localhost:3000/patient-packages';

  constructor(private http: HttpClient) { }

  getPatientPackages(): Observable<PatientPackage[]> {
    return this.http.get<PatientPackage[]>(this.baseUrl);
  }

  assignPackage(pp: PatientPackage): Observable<PatientPackage> {
    return this.http.post<PatientPackage>(this.baseUrl, pp);
  }
}
