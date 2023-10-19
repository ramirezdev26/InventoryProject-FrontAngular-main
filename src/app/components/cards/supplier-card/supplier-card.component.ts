import { Component, Input } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';

@Component({
  selector: 'app-supplier-card',
  templateUrl: './supplier-card.component.html',
  styleUrls: ['./supplier-card.component.scss']
})
export class SupplierCardComponent {

  @Input() supplier: Supplier = {
    id: '',
    branchId: '',
    name: '',
    number: 0,
    email: '',
    payment_term: ''
  }

}
