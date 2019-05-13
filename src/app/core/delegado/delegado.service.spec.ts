import { TestBed } from '@angular/core/testing';

import { DelegadoService } from './delegado.service';

describe('DelegadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelegadoService = TestBed.get(DelegadoService);
    expect(service).toBeTruthy();
  });
});
