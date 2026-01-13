import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package.model';

@Injectable({ providedIn: 'root' })
export class PackageService {
  private baseUrl = 'http://localhost:3000/packages';

  constructor(private http: HttpClient) { }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.baseUrl);
  }

  addPackage(p: Package): Observable<Package> {
    return this.http.post<Package>(this.baseUrl, p);
  }

  purchasePackage(patientId: string, packageId: string): Observable<any> {
    const body = {
      patient_id: patientId,
      package_id: packageId,
      purchased_at: new Date().toISOString()
    };
    const url = this.baseUrl.replace('/packages', '/patient-packages');
    return this.http.post<any>(url, body);
  }
}
