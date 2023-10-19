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
  jwtHelper = new JwtHelperService();
  currentBranchId: string = '';
  currentRolUser: string = '';
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.setToken(token);
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

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getCurrentBranchId(){
    return this.currentBranchId;
  }

  getCurrentRolUser(){
    return this.currentRolUser;
  }

  login(userDetails: any){
    return this.http.post(`${this.authApi}/api/v1/auth/login`, userDetails);
  }

  closeSession() {
    localStorage.removeItem('token');
  }

}
