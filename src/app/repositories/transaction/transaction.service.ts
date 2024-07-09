import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpResponse } from 'src/app/interfaces/http-response';
import { Transaction } from 'src/app/models/transaction';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly URL = `${environment.apiUrl}/transaction`;

  constructor(
    private httpRequestService: HttpRequestService
  ) { }

  fetchAll(params: any = {}): Observable<Transaction[]> {
    return this.httpRequestService.get(this.URL, params, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || []) as Transaction[];
        })
      );
  }

  create(transaction: Transaction): Observable<Transaction> {
    return this.httpRequestService.post(this.URL, transaction, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Transaction;
        })
      );
  }

  find(id: number): Observable<Transaction> {
    return this.httpRequestService.get(this.URL + "/" + id, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Transaction;
        })
      );
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.httpRequestService.put(this.URL + "/" + transaction.id, transaction, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Transaction;
        })
      );
  }

  delete(transaction: Transaction): Observable<void> {
    return this.httpRequestService.delete(this.URL + "/" + transaction.id)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
        })
      )
  }
}
