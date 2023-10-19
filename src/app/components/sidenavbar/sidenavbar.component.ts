import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.scss']
})
export class SidenavbarComponent {

  currentUserRole: string = '';

  constructor(private inventoryService: InventoryService, private router: Router, private authService: AuthService){
    this.authService.token$.subscribe((newtoken) => {
      this.currentUserRole = this.inventoryService.getCurrentRol();
    });
    this.currentUserRole = this.inventoryService.getCurrentRol();
    console.log(this.currentUserRole)
  }


  goToProductForm(){
    this.router.navigate(['products/new'])
  }

  goToAddStockForm(){
    this.router.navigate(['products/add-stock'])
  }

  goToInvoiceForm(){
    this.router.navigate(['invoices/new'])
  }

  goToUserForm(){
    this.router.navigate(['users/new'])
  }

  goToBranchForm(){
    this.router.navigate(['branches/new'])
  }

  goToSupplierForm(){
    this.router.navigate(['suppliers/new'])
  }

  logOut(){
    this.authService.closeSession();
    this.currentUserRole = '';
    this.router.navigate(['login'])
    
  }


}
