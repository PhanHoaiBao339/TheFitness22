import { TestBed } from '@angular/core/testing';

import { OrderAndOrderdetailService } from './order-and-orderdetail.service';

describe('OrderAndOrderdetailService', () => {
  let service: OrderAndOrderdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAndOrderdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
