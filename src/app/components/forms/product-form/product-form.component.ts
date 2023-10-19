import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit{

  productForm: FormGroup = new FormGroup({});
  input = new FormControl('', [Validators.required]);

  constructor(private builder: FormBuilder,
    private service: InventoryService){}

    branchId: string = '';

    ngOnInit(): void {
      this.branchId = this.service.getCurrentBranchId();
      this.productForm = this.builder.group(
        {
          name: '',
          description: '',
          price: '',
          category: 0,
          branchId: this.branchId
        });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit(){
    this.service.postNewProduct(this.productForm.value).subscribe(
      (answer) => console.log(answer)
      );
  }

}
