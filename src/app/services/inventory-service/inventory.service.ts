import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, single } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AuthService } from '../auth-service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.model';
import { Supplier } from 'src/app/models/supplier.model';
import emailjs from '@emailjs/browser'


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
  // api: string = `http://localhost:8081`;
  // commandApi: string = `http://localhost:8080`;

  emptyBody = {};
  token: any = this.authService.getToken();
  currentBranchId: string | null = this.authService.getCurrentBranchId();
  currentRolUser: string | null = this.authService.getCurrentRolUser();
  
  
  constructor(private http: HttpClient, private authService: AuthService, private authDecod: JwtHelperService) {
    const branchId = localStorage.getItem("branchid");
    if (branchId) {
      this.currentBranchId = branchId;
    }
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
  getSuppliersByBranch(input: string){
    return this.http.get<Supplier[]>(`${this.api}/suppliers/${input}`)
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

  postNewSupplier(supplier: Supplier){
    console.log(supplier);
    return this.http.post(`${this.commandApi}/supplier`, supplier)
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

  patchChangeUserRole(userInfo: any){
    return this.http.patch(`${this.commandApi}/user/role`, userInfo)
  }

  sendEmail(email:string, supplier: Supplier){
    console.log(email)
    emailjs.init('rHRFxb5gLsHEiahRM')
    emailjs.send("service_bwv4r8w","template_rgnpdq2",{
      to_name: email,
      message: `Name: ${supplier.name}, Email: ${supplier.email}, Contact number: ${supplier.number}, Payment Term: ${supplier.payment_term}`,
      });
  }
}
