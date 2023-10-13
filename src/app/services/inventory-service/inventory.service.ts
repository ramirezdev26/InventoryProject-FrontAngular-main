import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AuthService } from '../auth-service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.model';

interface WindowEnv {
  SERVICE_URI: string,
  QUERY_URI: string,
  SOCKET_URI: string,
  AUTH_URI: string
}

declare global {
  interface Window {
    _env: WindowEnv;
  }
}


@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  type: string = 'save';
  errorMsg: string = '';
  api: string = `http://${window._env.QUERY_URI}`;
  commandApi: string = `http://${window._env.SERVICE_URI}`;
  emptyBody = {};
  token: any = localStorage.getItem('token');
  currentBranchId: string | null = '';
  currentRolUser: string | null = '';
  
  
  constructor(private http: HttpClient, private authService: AuthService, private authDecod: JwtHelperService) {
    
  }

  


  getCurrentBranchId(): any{
    return this.currentBranchId;
  }
  getCurrentRol(): any{
    return this.currentRolUser;
  }

  setCurrentBranchId(branchId: string): void{
    this.currentBranchId = branchId;
  }
  setCurrentRol(rol: string | null):void{
    this.currentRolUser = rol;
  }
  
  getProductsByBranch(input: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products/${input}`);
  }
  getUsersByBranch(input:string): Observable<User[]>{
    return this.http.get<User[]>(`${this.api}/users/${input}`)
  }

  getAllBranches(): Observable<any> {
    return this.http.get(`${this.api}/branches`);
  }

  getInvoicesByBranch(input: string): Observable<any> {
    return this.http.get(`${this.api}/invoices/${input}`)
  }

  postNewBranch(branch: any){
    return this.http.post(`${this.commandApi}/branches`, branch)
  }

  postNewProduct(product: Product){
    return this.http.post(`${this.commandApi}/product`, product);
  }

  postNewUser(user: User){
    return this.http.post(`${this.commandApi}/user`, user)
  }

  patchFinalCustomerSale(saleInfo: any){
    return this.http.patch(`${this.commandApi}/product/customer-sale`, saleInfo)
  }

  patchResellerSale(saleInfo: any){
    return this.http.patch(`${this.commandApi}/product/reseller-sale`, saleInfo)
  }

  patchAddStockToProduct(addStockInfo: any){
    return this.http.patch(`${this.commandApi}/product/purchase`, addStockInfo)
  }
}
