import { Component } from '@angular/core';
import { Product, SocketProductAdded } from 'src/app/models/product.model';
import { InvoiceEvent } from 'src/app/models/invoice.model';
import { ProductStockAdded } from 'src/app/models/product.model';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  socketManager?:WebSocketSubject<User>;

  l_users: User[] = [];
  branchId: string = '';
  total: number = 0;
  p: number = 1;
  count: number = 3;

  constructor (private service: InventoryService,
    private socket:SocketService){}

  

  ngOnInit(){
    this.branchId = this.service.getCurrentBranchId();
    this.service.getUsersByBranch(this.branchId).subscribe({
      next: (users) => {
        this.l_users = users,
        this.total = this.l_users.length;
      },
      error: (console.log),
      complete: (console.log)
    })
  };










}
