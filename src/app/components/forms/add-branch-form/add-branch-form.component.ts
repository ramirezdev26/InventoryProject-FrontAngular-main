import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';


@Component({
  selector: 'app-add-branch-form',
  templateUrl: './add-branch-form.component.html',
  styleUrls: ['./add-branch-form.component.scss']
})
export class AddBranchFormComponent {

  productForm: FormGroup = new FormGroup({});
  input = new FormControl('', [Validators.required]);

  constructor(private builder: FormBuilder,
    private service: InventoryService,
    private route: ActivatedRoute){}

    ngOnInit(): void {
      this.productForm = this.builder.group(
        {
          name: '',
          country: '',
          city: ''
        });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit(){
    this.service.postNewBranch(this.productForm.value).subscribe(
      (answer) => console.log(answer)
      );
  }

}
