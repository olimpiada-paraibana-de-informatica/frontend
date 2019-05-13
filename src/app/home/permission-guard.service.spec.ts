import { TestBed } from '@angular/core/testing';

import { PermissionGuardService } from './permission-guard.service';

describe('PermissionGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissionGuardService = TestBed.get(PermissionGuardService);
    expect(service).toBeTruthy();
  });
});
