
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient) { }

    getRole(data: any) {
        return this.http.post<any>(`${environment.apiUrl}/role/list`, data).pipe(map(res => {
            return res;
        }));
    }

    getRolePermissions(id: number) {
        return this.http.get<any>(`${environment.apiUrl}/role/${id}/permissions`).pipe(map(res => {
            return res;
        }));
    }

    updateRolePermissions(data: any) {
        return this.http.put<any>(`${environment.apiUrl}/role/permissions`, data).pipe(map(res => {
            return res;
        }));
    }

    //   getRole(id: number): Observable<any> {
    //     return this.http.get<any>(`${this.apiUrl}/${id}`);
    //   }

    //   createRole(role: any): Observable<any> {
    //     return this.http.post<any>(this.apiUrl, role);
    //   }

    //   updateRole(id: number, role: any): Observable<any> {
    //     return this.http.put<any>(`${this.apiUrl}/${id}`, role);
    //   }

    //   deleteRole(id: number): Observable<any> {
    //     return this.http.delete<any>(`${this.apiUrl}/${id}`);
    //   }
}
