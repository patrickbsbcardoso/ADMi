import { TestBed, async, inject } from '@angular/core/testing';

import { EditaMembroGuard } from './edita-membro.guard';

describe('EditaMembroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaMembroGuard]
    });
  });

  it('should ...', inject([EditaMembroGuard], (guard: EditaMembroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
