import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/models/branch.model';
import { Student } from 'src/app/models/student.model';
import { InventoryService } from 'src/app/services/inventory-service/inventory.service';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { EventBranch } from 'src/app/models/branchEvent.model';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  socketManager?:WebSocketSubject<EventBranch>;

  l_branches: Branch[] = [];
  total: number = 0;
   p: number = 1;
  count: number = 3;

  constructor (private service: InventoryService,
    private socket:SocketService){}

 

  ngOnInit(){
    this.service.getAllBranches().subscribe({
      next: (course) => {
        this.l_branches = course,
        this.total = this.l_branches.length;
      },
      error: (console.log),
      complete: (console.log)
    })

    this.connectToMainSpace()

  };

  connectToMainSpace(){
    this.socketManager = this.socket.connetToGeneralSpace()
    this.socketManager.subscribe((message) => {
      console.log(message)
      this.addPost(message)
    })
  }

  addPost(event:EventBranch){
    var newBranch: Branch = {
      id: event.aggregateRootId,
      name: event.name,
      country: event.country,
      city: event.city
    }
    this.l_branches.unshift(newBranch)
  }


}
