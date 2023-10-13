import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

interface WindowEnv {
  SERVICE_URI: string,
  QUERY_URI: string,
  SOCKET_URI: string
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
  constructor(private http: HttpClient, private router: Router) {}

  type: string = 'save';
  errorMsg: string = '';
  api: string = `http://${window._env.QUERY_URI}`;
  commandApi: string = `http://${window._env.SERVICE_URI}`;
  emptyBody = {};
  currentBranchId: string = '';


  getCurrentBranchId(): string{
    return this.currentBranchId;
  }

  setCurrentBranchId(branchId: string): void{
    this.currentBranchId = branchId;
  }
  
  getProductsByBranch(input: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/products/${input}`);
  }

  getAllBranches(): Observable<any> {
    return this.http.get(`${this.api}/branches`);
  }

  getInvoicesByBranch(input: string): Observable<any> {
    return this.http.get(`${this.api}/invoices/${input}`)
  }

  postNewProduct(product: Product){
    return this.http.post(`${this.commandApi}/product`, product);
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
