import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginData } from '../../interfaces/login.interface';
import { UserBody, UserListResponse } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const loginData: LoginData = JSON.parse(localStorage.getItem('user') || '{}');
    return new HttpHeaders().set('Authorization', `Bearer ${loginData.token}`);
  }

  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${this.URL}/api/users`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  postUser(body: UserBody): Observable<UserListResponse> {
    return this.http.post<UserListResponse>(`${this.URL}/api/users`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  putUser(id: string, body: UserBody): Observable<UserListResponse> {
    return this.http.put<UserListResponse>(`${this.URL}/api/users/${id}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<UserListResponse> {
    return this.http.delete<UserListResponse>(`${this.URL}/api/users/${id}`, { headers: this.getHeaders() }).pipe(
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
