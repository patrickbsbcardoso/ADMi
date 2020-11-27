import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaMembroPageComponent } from './edita-membro-page.component';

describe('EditaMembroPageComponent', () => {
  let component: EditaMembroPageComponent;
  let fixture: ComponentFixture<EditaMembroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaMembroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaMembroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
