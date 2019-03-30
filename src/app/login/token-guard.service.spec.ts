import { TestBed } from '@angular/core/testing';

import { TokenGuardService } from './token-guard.service';

describe('TokenGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenGuardService = TestBed.get(TokenGuardService);
    expect(service).toBeTruthy();
  });
});
