import { Component, Input } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  constructor(private inventoryService: InventoryService){}

  @Input() user: User = {
    id: '',
    name: '',
    last_name: '',
    email: '',
    role: '',
    branchId: '',
  }

  isChangingRole: boolean = false;
  selectedRole: any = '';

  toggleRoleChange() {
    this.isChangingRole = !this.isChangingRole;
    if (!this.isChangingRole) {
      this.selectedRole = '';
    }
  }

  sendRoleChange() {
    const userInfo = {
      userId: this.user.id,
      branchId: this.user.branchId,
      role: this.selectedRole
    }
    this.inventoryService.patchChangeUserRole(userInfo).subscribe((response) =>
      console.log(response),
      this.user.role = this.selectedRole
    );
    this.isChangingRole = !this.isChangingRole;
  }

}
