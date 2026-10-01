import { TestBed } from '@angular/core/testing';

import { SizeManagerService } from './size-manager.service';

describe('SizeManagerService', () => {
  let service: SizeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
