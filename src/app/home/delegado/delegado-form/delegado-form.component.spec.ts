import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegadoFormComponent } from './delegado-form.component';

describe('DelegadoFormComponent', () => {
  let component: DelegadoFormComponent;
  let fixture: ComponentFixture<DelegadoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegadoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
