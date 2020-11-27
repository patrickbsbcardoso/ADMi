import { TestBed, async, inject } from '@angular/core/testing';

import { EditaUsuarioGuard } from './edita-usuario.guard';

describe('EditaUsuarioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditaUsuarioGuard]
    });
  });

  it('should ...', inject([EditaUsuarioGuard], (guard: EditaUsuarioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
