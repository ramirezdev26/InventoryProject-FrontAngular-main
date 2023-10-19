import { Component, Input } from '@angular/core';
import { Branch } from 'src/app/models/branch.model';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';


@Component({
  selector: 'app-branch-card',
  templateUrl: './branch-card.component.html',
  styleUrls: ['./branch-card.component.scss']
})
export class BranchCardComponent {

  constructor(private router: Router, private service: InventoryService) { }

  @Input() branch: Branch = {
    id: '',
    name: '',
    country: '',
    city: ''
  }

  updateBranchId(){
    localStorage.setItem("branchid", this.branch.id);
    this.service.setCurrentBranchId(this.branch.id);
  }

}
