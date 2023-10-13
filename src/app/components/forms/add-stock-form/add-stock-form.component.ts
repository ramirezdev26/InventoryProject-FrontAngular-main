import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import * as XLSX from 'xlsx';
import { StockToAdd } from 'src/app/models/stock-to-add.model';

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
  inventoryExcel: any;

  constructor(private service: InventoryService) {}

  ngOnInit() {
    this.branchId = this.service.getCurrentBranchId();
    this.service.getProductsByBranch(this.branchId).subscribe((products) => {
      this.products = products;
    });
  }
  readInventoryExcel(event: any) {

    const file = event.target.files[0];

    let fileReader = new FileReader();

    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {

      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;
      let dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

      this.inventoryExcel = dataExcel
      console.log(dataExcel);


    }

  }

  sendExcel(){
    const branchId: string | null = this.branchId;
    const stock: StockToAdd = {
      branchId: branchId || '',
      products: this.inventoryExcel
    }

    this.service.patchAddStockToProduct(stock).subscribe((data) => {
      console.log(stock);
      alert('Stock added successfully');
    },
    (error) => {
      alert('Error adding stock');
    }
    );
  }

  addStock() {
    if (this.selectedProduct && this.quantityToAdd > 0) {
      const addStockInfo = {
        products: {
          productId: this.selectedProduct.id,
          quantity: this.quantityToAdd
        },
        branchId: this.selectedProduct.branchId
      }
      this.service.patchAddStockToProduct(addStockInfo).subscribe();
    }
  }
}
