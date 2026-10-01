import { TestBed } from '@angular/core/testing';

import { BlogManagerService } from './blog-manager.service';

describe('BlogManagerService', () => {
  let service: BlogManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
