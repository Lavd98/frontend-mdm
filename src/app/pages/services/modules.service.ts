import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Heroes } from '../../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private URL='http://localhost:3001'
  constructor(private http:HttpClient) { }

  obtenerModulos(userId: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/modulos${userId}`).pipe(
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
