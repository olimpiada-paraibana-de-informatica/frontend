import { TestBed } from '@angular/core/testing';

import { AlunoResolverService } from './aluno-resolver.service';

describe('AlunoResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlunoResolverService = TestBed.get(AlunoResolverService);
    expect(service).toBeTruthy();
  });
});
