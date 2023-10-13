import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';

@Component({
  selector: 'app-user-new-from',
  templateUrl: './user-new-from.component.html',
  styleUrls: ['./user-new-from.component.scss']
})
export class UserNewFromComponent {


  productForm: FormGroup = new FormGroup({});
  input = new FormControl('', [Validators.required]);

  constructor(private builder: FormBuilder,
    private service: InventoryService,
    private route: ActivatedRoute){}

    branchId: string = '';

    ngOnInit(): void {
      this.branchId = this.service.getCurrentBranchId();
      this.productForm = this.builder.group(
        {
          name: '',
          last_name: '',
          email: '',
          password: '',
          role: '',
          branchId: this.branchId
        });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit(){
    this.service.postNewUser(this.productForm.value).subscribe(
      (answer) => console.log(answer)
      );
  }

}
