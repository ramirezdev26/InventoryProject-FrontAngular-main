import { Component } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { Supplier } from 'src/app/models/supplier.model';

@Component({
  selector: 'app-supplier-page',
  templateUrl: './supplier-page.component.html',
  styleUrls: ['./supplier-page.component.scss']
})
export class SupplierPageComponent {

  socketManager?:WebSocketSubject<Supplier>;

  l_suppliers: Supplier[] = [];
  branchId: string = '';
  total: number = 0;
  p: number = 1;
  count: number = 3;

  constructor (private service: InventoryService,
    private socket:SocketService){}

  

  ngOnInit(){
    this.branchId = this.service.getCurrentBranchId();
    this.service.getSuppliersByBranch(this.branchId).subscribe({
      next: (suppliers) => {
        this.l_suppliers = suppliers,
        this.total = this.l_suppliers.length;
      },
      error: (console.log),
      complete: (console.log)
    })
  };








}
