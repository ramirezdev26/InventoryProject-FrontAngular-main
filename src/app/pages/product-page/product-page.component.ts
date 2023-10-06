import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Invoice, InvoiceEvent } from 'src/app/models/invoice.model';
import { ProductStockAdded } from 'src/app/models/product.model';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  socketManager?:WebSocketSubject<Product>;

  l_products: Product[] = [];
  branchId: string = '';
  total: number = 0;
  p: number = 1;
  count: number = 3;

  constructor (private service: InventoryService,
    private socket:SocketService){}

  

  ngOnInit(){
    this.branchId = this.service.getCurrentBranchId();
    this.service.getProductsByBranch(this.branchId).subscribe({
      next: (products) => {
        this.l_products = products,
        this.total = this.l_products.length;
      },
      error: (console.log),
      complete: (console.log)
    })

    this.connectToProductSpace()
  };

  connectToProductSpace(){
    this.socketManager = this.socket.connetToProductSpace(this.branchId)
    this.socketManager.subscribe((message) => {
      console.log(message)
      this.updateView(message)
    })
  }

  updateView(message: any) {
    if (message?.type.includes('StockToProductAdded')) {
      this.stockAddedView(message);
    } else if (message?.type.includes('ProductAdded')) {
      this.addProduct(message);
    } else if (message?.type.includes(' Customer type')) {
      this.reduceStockView(message);
    }
  }


  addProduct(event:Product){
    var newProduct: Product = {
      id: event.id,
      name: event.name,
      description: event.description,
      inventoryStock: event.inventoryStock,
      price: event.price,
      category: event.category,
      branchId: event.branchId,
    }
    this.l_products.unshift(newProduct)
  }

  stockAddedView(message:ProductStockAdded) {
    this.l_products?.forEach((product) => {
      if (product.id === message.productId) {
        product.inventoryStock += message.quantityToAdd;
      }
    });
  }

  reduceStockView(message:InvoiceEvent) {
    this.l_products?.forEach((product) => {
      message.products.forEach((productInvoice) => {
        if (product.id === productInvoice.id) {
          product.inventoryStock -= productInvoice.quantity;
        }
      });
    });
  }


}
