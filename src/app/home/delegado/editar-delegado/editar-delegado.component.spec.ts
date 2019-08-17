import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDelegadoComponent } from './editar-delegado.component';

describe('EditarDelegadoComponent', () => {
  let component: EditarDelegadoComponent;
  let fixture: ComponentFixture<EditarDelegadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDelegadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDelegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
