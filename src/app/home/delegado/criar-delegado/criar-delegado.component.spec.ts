import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDelegadoComponent } from './criar-delegado.component';

describe('CriarDelegadoComponent', () => {
  let component: CriarDelegadoComponent;
  let fixture: ComponentFixture<CriarDelegadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarDelegadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarDelegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
