import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    // Mock login สำหรับทดสอบ
    if (username === 'admin' && password === '123456') {
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          username: 'admin',
          name: 'ผู้ดูแลระบบ',
          role: 'admin'
        }
      };
      return of(mockResponse).pipe(
        delay(1000),
        tap(response => this.setSession(response))
      );
    }
    return throwError(() => new Error('Invalid credentials')).pipe(delay(1000));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  private setSession(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
  }
}
