import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set(token: string) {
    localStorage.setItem(environment.tokenKey, token);
  }

  get(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  remove() {
    localStorage.removeItem(environment.tokenKey);
  }
}
