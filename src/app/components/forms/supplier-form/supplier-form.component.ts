import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {

  supplierForm: FormGroup = new FormGroup({});
  input = new FormControl('', [Validators.required]);

  constructor(private builder: FormBuilder,
    private service: InventoryService,
    private route: ActivatedRoute){}

    branchId: string = '';

    ngOnInit(): void {
      this.branchId = this.service.getCurrentBranchId();
      this.supplierForm = this.builder.group(
        {
          branchId: this.branchId,
          name: "",
          number: 0,
          email: "",
          payment_term: ""
        });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit(){
    this.service.postNewSupplier(this.supplierForm.value).subscribe(
      (answer) => console.log(answer)
      );
  }

}
