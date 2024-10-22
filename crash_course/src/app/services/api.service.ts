import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsType } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL: string = '';

  constructor(private httpClient: HttpClient) {}

  setBaseURL(url: string) {
    this.baseURL = url;
  }

  get<T>(url: string, options: OptionsType): Observable<T> {
    return this.httpClient.get<T>(
      `${this.baseURL}/${url}`,
      options
    ) as Observable<T>;
  }

  put<T, B>(url: string, body: B, options: OptionsType): Observable<T> {
    return this.httpClient.put<T>(
      `${this.baseURL}/${url}`,
      body,
      options
    ) as Observable<T>;
  }

  post<T, B>(url: string, body: B, options: OptionsType): Observable<T> {
    return this.httpClient.post<T>(
      `${this.baseURL}/${url}`,
      body,
      options
    ) as Observable<T>;
  }

  delete<T>(url: string, options: OptionsType): Observable<T> {
    return this.httpClient.delete<T>(
      `${this.baseURL}/${url}`,
      options
    ) as Observable<T>;
  }
}
