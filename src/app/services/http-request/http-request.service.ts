import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { HttpResponse } from 'src/app/interfaces/http-response';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  get(url: string, params: any = {}, usingAuth: boolean = true): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(url, {
      headers: {
        Authorization: usingAuth ? ('Bearer ' + this.tokenService.get() || '') : '',
      },
      params
    });
  }

  post(url: string, body: any = [], usingAuth: boolean = true): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(url, body, {
      headers: {
        Authorization: usingAuth ? ('Bearer ' + this.tokenService.get() || '') : '',
      }
    });
  }

  put(url: string, body: any = [], usingAuth: boolean = true): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(url, body, {
      headers: {
        Authorization: usingAuth ? ('Bearer ' + this.tokenService.get() || '') : '',
      }
    });
  }

  delete(url: string, usingAuth: boolean = true): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(url, {
      headers: {
        Authorization: usingAuth ? ('Bearer ' + this.tokenService.get() || '') : '',
      }
    });
  }
}
