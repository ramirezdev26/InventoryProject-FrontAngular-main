import { Component, Input } from '@angular/core';
import { Branch } from 'src/app/models/branch.model';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  constructor(private router: Router, private service: InventoryService) { }

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
