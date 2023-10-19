import { Component, Input} from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';


@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.scss']
})
export class InvoiceCardComponent {

  constructor() { }
  @Input() invoice: Invoice = {
    id: '',
    products: [],
    total: 0,
    date: new Date(),
    invoiceType: "",
    branchId: ""
  }

}
