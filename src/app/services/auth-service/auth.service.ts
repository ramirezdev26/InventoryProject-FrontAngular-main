import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();
  authApi: string = `http://${window._env.AUTH_URI}`;
  //authApi: string = `http://localhost:8083`;
  jwtHelper = new JwtHelperService();
  currentBranchId: string = '';
  currentRolUser: string = '';
  currentEmailUser: string = '';
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.setToken(token);
    }
    if (email){
      this.setUserEmail(email);
    }
  }


  setToken(token: string) {
    this.tokenSubject.next(token);
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken) {
      this.currentBranchId = decodedToken.branchId;
      this.currentRolUser = decodedToken.roles;
    }
  }

  setUserEmail(email: string){
    this.currentEmailUser = email;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getCurrentBranchId(){
    return this.currentBranchId;
  }

  getCurrentRolUser(){
    return this.currentRolUser;
  }

  getCurrentEmailUser(){
    return this.currentEmailUser;
  }

  login(userDetails: any){
    return this.http.post(`${this.authApi}/api/v1/auth/login`, userDetails);
  }

  closeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('branchid');
  }

}
