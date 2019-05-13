import { TestBed } from '@angular/core/testing';

import { DelegadoResolverService } from './delegado-resolver.service';

describe('DelegadoResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelegadoResolverService = TestBed.get(DelegadoResolverService);
    expect(service).toBeTruthy();
  });
});
