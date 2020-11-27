import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMembroPageComponent } from './lista-membro-page.component';

describe('ListaMembroPageComponent', () => {
  let component: ListaMembroPageComponent;
  let fixture: ComponentFixture<ListaMembroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMembroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMembroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
