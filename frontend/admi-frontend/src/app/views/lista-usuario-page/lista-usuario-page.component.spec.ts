import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuarioPageComponent } from './lista-usuario-page.component';

describe('ListaUsuarioPageComponent', () => {
  let component: ListaUsuarioPageComponent;
  let fixture: ComponentFixture<ListaUsuarioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaUsuarioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUsuarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
