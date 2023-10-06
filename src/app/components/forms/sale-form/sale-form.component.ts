import { Component, OnInit  } from '@angular/core';
import { Product, CartItem } from 'src/app/models/product.model';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent implements OnInit {
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
  selectedQuantity: number = 0;
  selectedName: string = '';
  branchId: string = '';
  products: Product[] = [];
  cart: CartItem[] = [];
  cartColumns: string[] = ['name', 'quantity', 'actions'];

  constructor (private service: InventoryService){}

  ngOnInit() {
    this.branchId = this.service.getCurrentBranchId();
    this.service.getProductsByBranch(this.branchId).subscribe({
      next: (products) => {
        this.products = products
      },
      error: (console.log),
      complete: (console.log)
    })

  }

  addToCart() {
    if (this.selectedProduct.id != '' && this.selectedQuantity < this.selectedProduct.inventoryStock) {
      const existingItem = this.cart.find(item => item.id === this.selectedProduct.id);
      if (existingItem) {
        existingItem.quantity += this.selectedQuantity;
      } else {
        this.cart.push({
          id: this.selectedProduct.id, 
          name: this.selectedProduct.name, 
          quantity: this.selectedQuantity 
        });
        console.log(this.cart);
      }
      this.cart = [...this.cart];
      this.selectedProduct = {
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
    }
  }

  removeFromCart(item: CartItem) {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
      // Clonar el arreglo para activar la detección de cambios
      this.cart = [...this.cart];
  }
}

registerFinalCustomerSale() {
  const finalCustomerSale = {
    products: this.cart,
    branchId: this.branchId
  }
  this.service.patchFinalCustomerSale(finalCustomerSale).subscribe();
  this.cart = [];
}

registerResellerSale() {
  const finalCustomerSale = {
    products: this.cart,
    branchId: this.branchId
  }
  this.service.patchResellerSale(finalCustomerSale).subscribe();
  this.cart = [];
}
}
