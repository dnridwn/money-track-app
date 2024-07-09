import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpResponse } from 'src/app/interfaces/http-response';
import { Category } from 'src/app/models/category';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly URL = `${environment.apiUrl}/category`;

  constructor(
    private httpRequestService: HttpRequestService
  ) { }

  fetchAll(params: any = {}): Observable<Category[]> {
    return this.httpRequestService.get(this.URL, params, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || []) as Category[];
        })
      );
  }

  create(category: Category): Observable<Category> {
    return this.httpRequestService.post(this.URL, category, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Category;
        })
      );
  }

  find(id: number): Observable<Category> {
    return this.httpRequestService.get(this.URL + "/" + id, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Category;
        })
      );
  }

  update(category: Category): Observable<Category> {
    return this.httpRequestService.put(this.URL + "/" + category.id, category, false)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
          return (response.data || {}) as Category;
        })
      );
  }

  delete(category: Category): Observable<void> {
    return this.httpRequestService.delete(this.URL + "/" + category.id)
      .pipe(
        map((response: HttpResponse) => {
          if (response.error) throw new Error(response.message);
        })
      )
  }
}
