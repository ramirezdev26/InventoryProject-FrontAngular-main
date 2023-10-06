import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';

@Component({
  selector: 'app-add-stock-form',
  templateUrl: './add-stock-form.component.html',
  styleUrls: ['./add-stock-form.component.scss']
})
export class AddStockFormComponent {
  selectedProduct: Product = {
    id: '',
    name: '',
    description: '',
    inventoryStock: 0,
    price: 0,
    category: '',
    branchId: '',
    type: '',
    quantity: 0
  };
  quantityToAdd: number = 0; 
  products: Product[] = [];
  branchId: string = '';

  constructor(private service: InventoryService) {}

  ngOnInit() {
    this.branchId = this.service.getCurrentBranchId();
    this.service.getProductsByBranch(this.branchId).subscribe((products) => {
      this.products = products;
    });
  }

  addStock() {
    if (this.selectedProduct && this.quantityToAdd > 0) {
      const addStockInfo = {
        productId: this.selectedProduct.id,
        branchId: this.selectedProduct.branchId,
        quantity: this.quantityToAdd
      }
      this.service.patchAddStockToProduct(addStockInfo).subscribe();
    }
  }
}
