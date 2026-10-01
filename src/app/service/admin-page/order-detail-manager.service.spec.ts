import { TestBed } from '@angular/core/testing';

import { OrderDetailManagerService } from './order-detail-manager.service';

describe('OrderDetailManagerService', () => {
  let service: OrderDetailManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDetailManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
