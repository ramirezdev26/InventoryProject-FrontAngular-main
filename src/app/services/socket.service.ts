import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject  } from 'rxjs/webSocket'
import { EventBranch } from '../models/branchEvent.model';
import { Product } from '../models/product.model';
import { InvoiceEvent } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  connetToGeneralSpace():WebSocketSubject<EventBranch>{
    return webSocket(`WS://${window._env.SOCKET_URI}/inventory/mainSpace`);
  }
  connetToProductSpace(branchId: string):WebSocketSubject<Product>{
    return webSocket(`WS://${window._env.SOCKET_URI}/inventory/${branchId}`);
  }
  connectToInvoiceSpace(branchId: string):WebSocketSubject<InvoiceEvent>{
    return webSocket(`WS://${window._env.SOCKET_URI}/inventory/invoice/${branchId}`)
  }
}
