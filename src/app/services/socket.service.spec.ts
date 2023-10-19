import { TestBed } from '@angular/core/testing';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { EventBranch } from '../models/branchEvent.model';

import { SocketService } from './socket.service';

describe('SocketService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService],
    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect to general space', () => {
    const webSocketSubject: WebSocketSubject<EventBranch> = service.connetToGeneralSpace();

    expect(webSocketSubject).toBeTruthy();
    expect(webSocketSubject instanceof WebSocketSubject).toBe(true);
  });

  it('should connect to product space', () => {
    const branchId = 'testBranch';
    const webSocketSubject: WebSocketSubject<any> = service.connetToProductSpace(branchId);

    expect(webSocketSubject).toBeTruthy();
    expect(webSocketSubject instanceof WebSocketSubject).toBe(true);
  });

  it('should connect to invoice space', () => {
    const branchId = 'testBranch';
    const webSocketSubject: WebSocketSubject<any> = service.connectToInvoiceSpace(branchId);

    expect(webSocketSubject).toBeTruthy();
    expect(webSocketSubject instanceof WebSocketSubject).toBe(true);
  });


});
