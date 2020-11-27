import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMembroPageComponent } from './info-membro-page.component';

describe('InfoMembroPageComponent', () => {
  let component: InfoMembroPageComponent;
  let fixture: ComponentFixture<InfoMembroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMembroPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMembroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
