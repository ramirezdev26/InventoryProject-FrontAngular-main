import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { Product } from 'src/app/models/product.model';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';


@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.scss']
})
export class InvoiceCardComponent {

  constructor(private router: Router, private service: InventoryService) { }
  @Input() invoice: Invoice = {
    id: '',
    products: [],
    total: 0,
    date: new Date(),
    invoiceType: "",
    branchId: ""
  }

}
