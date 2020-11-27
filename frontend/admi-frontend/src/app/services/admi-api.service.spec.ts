import { TestBed } from '@angular/core/testing';

import { AdmiApiService } from './admi-api.service';

describe('UsuarioApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmiApiService = TestBed.get(AdmiApiService);
    expect(service).toBeTruthy();
  });
});
