import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  userLogin(data: any): Observable<any> {
    return this.http.post(
      this.apiUrl + "/login",
      data,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).pipe(
      catchError(this.handleError)
    );
  }

  registerUser(userData: any): Observable<any> {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    if (userData.profileImage) {
      formData.append('profile_image', userData.profileImage, userData.profileImage.name);
    }

    return this.http.post(this.apiUrl + "/register", formData).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server-side error: ${error.status} - ${error.message}`);
    }
    return throwError(
      `An error occurred while trying to Handle request Please try again later.`
    );
  }
}


