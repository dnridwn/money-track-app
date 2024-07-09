import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { Account } from './../../models/account';
import { Injectable } from '@angular/core';
import { HttpResponse } from 'src/app/interfaces/http-response';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly URL = `${environment.apiUrl}/account`;

  constructor(
    private httpRequestService: HttpRequestService
  ) { }

  fetchAll(params: any = {}): Observable<Account[]> {
    return this.httpRequestService.get(this.URL, params, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || []) as Account[];
        })
      );
  }

  create(account: Account): Observable<Account> {
    return this.httpRequestService.post(this.URL, account, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Account;
        })
      );
  }

  find(id: number): Observable<Account> {
    return this.httpRequestService.get(this.URL + "/" + id, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Account;
        })
      );
  }

  update(account: Account): Observable<Account> {
    return this.httpRequestService.put(this.URL + "/" + account.id, account, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Account;
        })
      );
  }

  delete(account: Account): Observable<void> {
    return this.httpRequestService.delete(this.URL + "/" + account.id)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
        })
      )
  }
}
