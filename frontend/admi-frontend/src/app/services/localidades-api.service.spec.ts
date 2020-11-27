import { TestBed } from '@angular/core/testing';

import { LocalidadesApiService } from './localidades-api.service';

describe('LocalidadesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalidadesApiService = TestBed.get(LocalidadesApiService);
    expect(service).toBeTruthy();
  });
});
