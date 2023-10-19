import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket'
import { EventBranch } from '../models/branchEvent.model';
import { Product } from '../models/product.model';
import { InvoiceEvent } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  //api_socket: string = `${window._env.SOCKET_URI}`;
  api_socket: string = `localhost:8082`;


  constructor() { }
  connetToGeneralSpace():WebSocketSubject<EventBranch>{
    return webSocket(`WS://${this.api_socket}/inventory/mainSpace`);
  }
  connetToProductSpace(branchId: string):WebSocketSubject<Product>{
    return webSocket(`WS://${this.api_socket}/inventory/${branchId}`);
  }
  connectToInvoiceSpace(branchId: string):WebSocketSubject<InvoiceEvent>{
    return webSocket(`WS://${this.api_socket}/inventory/invoice/${branchId}`)
  }
}
