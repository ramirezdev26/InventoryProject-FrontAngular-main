import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();
  authApi: string = `http://${window._env.AUTH_URI}`;
  constructor(private http: HttpClient) {}


  setToken(token: string) {
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  login(userDetails: any){
    return this.http.post(`${this.authApi}/api/v1/auth/login`, userDetails);
  }

}
