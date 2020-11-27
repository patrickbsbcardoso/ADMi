import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCadastroPageComponent } from './usuario-cadastro-page.component';

describe('UsuarioCadastroPageComponent', () => {
  let component: UsuarioCadastroPageComponent;
  let fixture: ComponentFixture<UsuarioCadastroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioCadastroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCadastroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
