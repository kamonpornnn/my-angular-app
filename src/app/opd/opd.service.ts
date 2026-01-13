import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OPDVisit } from '../models/opd.model';

@Injectable({ providedIn: 'root' })
export class OpdService {
  private baseUrl = 'http://localhost:3000/opd';

  constructor(private http: HttpClient) {}

  getVisits(): Observable<OPDVisit[]> {
    return this.http.get<OPDVisit[]>(this.baseUrl);
  }

  addVisit(v: OPDVisit): Observable<OPDVisit> {
    return this.http.post<OPDVisit>(this.baseUrl, v);
  }
}
