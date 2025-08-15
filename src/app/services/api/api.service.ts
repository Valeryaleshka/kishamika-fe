import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/';

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, body, { headers });
  }

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.http.get<T>(this.apiUrl + url, { observe: 'response', params, headers });
  }
}
