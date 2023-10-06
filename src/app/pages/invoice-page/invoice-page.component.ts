import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Invoice, InvoiceEvent } from 'src/app/models/invoice.model';


@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent {

  socketManager?:WebSocketSubject<InvoiceEvent>;

  l_invoice: Invoice[] = [];
  branchId: string = '';
  total: number = 0;
   p: number = 1;
  count: number = 3;

  constructor (private service: InventoryService,
    private socket:SocketService){}

 

  ngOnInit(){
    this.branchId = this.service.getCurrentBranchId();
    this.service.getInvoicesByBranch(this.branchId).subscribe({
      next: (invoices) => {
        this.l_invoice = invoices,
        this.total = this.l_invoice.length;
      },
      error: (console.log),
      complete: (console.log)
    })

    this.connectToMainSpace()

  };

  connectToMainSpace(){
    this.socketManager = this.socket.connectToInvoiceSpace(this.branchId)
    this.socketManager.subscribe((message) => {
      console.log(message)
      this.addInvoice(message)
    })
  }

  addInvoice(event:InvoiceEvent){
    var newInvoice: Invoice = {
      id: event.id,
      products: event.products,
      total: event.total,
      date: new Date(),
      invoiceType: event.type,
      branchId: event.branchId
    }
    this.l_invoice.unshift(newInvoice)
  }


}
