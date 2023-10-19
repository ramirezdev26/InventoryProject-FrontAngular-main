import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  constructor() { }

  @Input() product: Product = {
    id: '',
    name: '',
    description: '',
    inventoryStock: 0,
    price: 0,
    category: '',
    branchId: ''
  }

}
