import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorsForm } from 'src/app/shared/validatorsForm';
import { Delegado } from 'src/app/core/delegado/delegado';

@Component({
  selector: 'app-delegado-form',
  templateUrl: './delegado-form.component.html',
  styleUrls: ['./delegado-form.component.scss']
})
export class DelegadoFormComponent implements OnInit {

  @Input() textSubmit: string;
  hide = true;
  hideConfirm = true;
  @Input() delegado: Delegado;
  delegadoForm: FormGroup;
  @Output() childSubmit = new EventEmitter<Delegado>();
  
  constructor() { }

  ngOnInit() {
    this.delegadoForm = new FormGroup({
      firstName: new FormControl(this.delegado.firstName, [Validators.required]),
      lastName: new FormControl(this.delegado.lastName, [Validators.required]),
      email: new FormControl(this.delegado.email, [Validators.required, Validators.email]),
      emailConfirm: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(this.delegado.password, [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    }, {
      validators: [ ValidatorsForm.MatchEmail, ValidatorsForm.MatchPassword ]
    });
  }

  submitForm(){
    const delegado = this.delegadoForm.value;
    delegado.id = this.delegado.id;
    this.childSubmit.emit(delegado);
  }

}
