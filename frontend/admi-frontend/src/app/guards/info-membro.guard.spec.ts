import { TestBed, async, inject } from '@angular/core/testing';

import { InfoMembroGuard } from './info-membro.guard';

describe('InfoMembroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoMembroGuard]
    });
  });

  it('should ...', inject([InfoMembroGuard], (guard: InfoMembroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
