import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(user: string, password: string): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${this.URL}/users`).pipe(
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
