import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient,private router:Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  sendOTP(email: string): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login?username=${email}`, {})
      .pipe(
        // Log successful response
        tap((response) => {
          console.log(response);
          alert(response.data);
        }),

        // Catch and handle errors
        catchError((error): Observable<void> => {
          console.error('Error occurred while sending OTP:', error);
          alert('Some error occured while sending OTP');
          return EMPTY;
        })
      );
  }

  verifyOTP(email: string, otp: string): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/verify-otp`, {
        username: email,
        otp,
        roles: ['ROLE_EMPLOYEE'],
      })
      .pipe(
        tap((response) => {
          console.log(response);
          if (response.data) {
            let user = {
              email: email,
              roles: ['ROLE_EMPLOYEE'],
              token: response.data,
            };
            if (user && user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
            }
          } else {
            alert('Invalid OTP');
          }
        }),

        // Catch and handle errors
        catchError((error): Observable<void> => {
          console.error('Error occurred while verifying OTP:', error);
          alert('Some error occured while verifying OTP');
          return EMPTY;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }

  validateToken(): Observable<boolean> {
    const currentUser = this.currentUserValue;
    if (!currentUser || !currentUser.token) {
      return throwError(() => new Error('No token found'));
    }

    return this.http
      .post<boolean>(`${environment.apiUrl}/auth/validate`, {
        token: currentUser.token,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Token is invalid or expired
            this.logout(); // Remove the token from localStorage
          }
          return throwError(() => error);
        })
      );
  }
}
