import { TestBed } from '@angular/core/testing';

import { FlavorOrColorService } from './flavor-or-color.service';

describe('FlavorOrColorService', () => {
  let service: FlavorOrColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlavorOrColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
