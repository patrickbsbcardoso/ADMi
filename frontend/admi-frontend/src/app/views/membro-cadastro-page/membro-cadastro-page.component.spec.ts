import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroCadastroPageComponent } from './membro-cadastro-page.component';

describe('MembroCadastroPageComponent', () => {
  let component: MembroCadastroPageComponent;
  let fixture: ComponentFixture<MembroCadastroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembroCadastroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembroCadastroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
