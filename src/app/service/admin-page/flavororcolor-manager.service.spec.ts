import { TestBed } from '@angular/core/testing';

import { FlavororcolorManagerService } from './flavororcolor-manager.service';

describe('FlavororcolorManagerService', () => {
  let service: FlavororcolorManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlavororcolorManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
