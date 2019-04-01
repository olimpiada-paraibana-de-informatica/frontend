import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorsForm } from 'src/app/shared/validatorsForm';
import { Delegado } from 'src/app/core/delegado/delegado';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';

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
  
  private categories = [];

  cities = [{
    id:"1",
    name: "Sousa"
  },{
    id: "2",
    name:"Olivedos"
  }];

  constructor( private delegadoService: DelegadoService) { }

  ngOnInit() {
    this.delegadoService.getCategories().subscribe((res)=>{
      this.categories = res;
    })
    this.delegadoForm = new FormGroup({
      name: new FormControl(this.delegado.name, [Validators.required]),
      email: new FormControl(this.delegado.email, [Validators.required, Validators.email]),
      emailConfirm: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(this.delegado.password, [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
      schoolName: new FormControl(this.delegado.schoolName, [Validators.required]),
      schoolCity: new FormControl(this.delegado.schoolCity, [Validators.required]),
      category: new FormControl('', [Validators.required]),
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
