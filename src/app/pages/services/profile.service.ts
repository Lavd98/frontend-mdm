import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginData } from '../../interfaces/login.interface';
import { ProfileListResponse } from '../../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private URL='http://localhost:3000'
  constructor(private http:HttpClient) { }

  getProfiles(): Observable<ProfileListResponse> {
    const loginData : LoginData = JSON.parse(localStorage.getItem('user') || '{}');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${loginData.token}`);

    // Include the headers in the request options
    const options = { headers: headers };
    return this.http.get<ProfileListResponse>(`${this.URL}/api/profiles`,options).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

}
