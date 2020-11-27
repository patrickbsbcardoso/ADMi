import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaUsuarioPageComponent } from './edita-usuario-page.component';

describe('EditaUsuarioPageComponent', () => {
  let component: EditaUsuarioPageComponent;
  let fixture: ComponentFixture<EditaUsuarioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaUsuarioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaUsuarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
