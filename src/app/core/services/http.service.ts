import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private SERVER_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.apiUrl,
      "ngrok-skip-browser-warning": "69420", // You can remove this: it's only to be able to use Ngrock
    },
  };

  ejectQuery<T>(url: string, query: Record<string, string> = {}, options = {}): Observable<T> {
    const queryString = new URLSearchParams(query).toString();
    console.log("ejectQuery");
    
    return this.http
      .get<T>(`${this.SERVER_URL}${url}?${queryString}`, {
        ...this.options,
        ...options,
      })
      .pipe(catchError(this.handleError));
  }

  ejectPost<T>(url: string, data: any, options = {}, query: Record<string, string> = {}) {
    const queryString = new URLSearchParams(query).toString();

    return this.http
      .post<T>(`${this.SERVER_URL}${url}?${queryString}`, data, {
        ...this.options,
        ...options,
      })
      .pipe(catchError(this.handleError));
  }

  // this endpoint is specific for images
  ejectPostFormData<T>(url: string, data: FormData, options = {}) {
    return this.http
      .post<T>(`${this.SERVER_URL}${url}`, data, {
        // ...this.options,
        ...options,
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .pipe(catchError(this.handleError));
  }

  ejectPatch<T>(url: string, data: any, options = {}) {
    return this.http
      .patch<T>(`${this.SERVER_URL}${url}`, data, {
        ...this.options,
        ...options,
      })
      .pipe(catchError(this.handleError));
  }

  ejectPut<T>(url: string, data: any, options = {}) {
    return this.http
      .put<T>(`${this.SERVER_URL}${url}`, data, {
        ...this.options,
        ...options,
      })
      .pipe(catchError(this.handleError));
  }

  ejectDelete<T>(url: string, options = {}) {
    return this.http
      .delete<T>(`${this.SERVER_URL}${url}`, {
        ...this.options,
        ...options,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status} at ${new Date().toLocaleString()}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
    // return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
