import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input() user: User = {
    id: '',
    name: '',
    last_name: '',
    email: '',
    role: '',
    branchId: '',
  }

}
