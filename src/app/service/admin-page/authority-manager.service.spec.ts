import { TestBed } from '@angular/core/testing';

import { AuthorityManagerService } from './authority-manager.service';

describe('AuthorityManagerService', () => {
  let service: AuthorityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorityManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
