import { TestBed } from '@angular/core/testing';

import { CompetidorService } from './competidor.service';

describe('CompetidorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompetidorService = TestBed.get(CompetidorService);
    expect(service).toBeTruthy();
  });
});
