import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegadoListComponent } from './delegado-list.component';

describe('DelegadoListComponent', () => {
  let component: DelegadoListComponent;
  let fixture: ComponentFixture<DelegadoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegadoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
