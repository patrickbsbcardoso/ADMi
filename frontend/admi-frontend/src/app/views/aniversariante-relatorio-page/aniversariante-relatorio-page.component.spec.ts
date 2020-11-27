import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AniversarianteRelatorioPageComponent } from './aniversariante-relatorio-page.component';

describe('AniversarianteRelatorioPageComponent', () => {
  let component: AniversarianteRelatorioPageComponent;
  let fixture: ComponentFixture<AniversarianteRelatorioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniversarianteRelatorioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AniversarianteRelatorioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
