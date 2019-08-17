import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetidorRankComponent } from './competidor-rank.component';

describe('CompetidorRankComponent', () => {
  let component: CompetidorRankComponent;
  let fixture: ComponentFixture<CompetidorRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetidorRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetidorRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
