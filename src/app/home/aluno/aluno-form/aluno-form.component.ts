import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormControl , Validators } from '@angular/forms';
import {ValidatorsForm} from '../../../shared/validatorsForm';
import {Aluno} from '../../../core/aluno/aluno';
import {AlunoService} from '../../../core/aluno/aluno.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name' ];
  @Input() textSubmit: string;
  hide = true;
  hideConfirm = true;
  @Input() aluno: Aluno;
  alunoForm: FormGroup;
  @Output() childSubmit = new EventEmitter<Aluno>();

  selectedPrivileges: SelectionModel<string>;

  genders = [{
    id:"1",
    name: "Feminino"
  },{
    id: "2",
    name:"Masculino"
  },
    {
      id:3,
      name: "Não binário"
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private alunoService: AlunoService) { }

  ngOnInit() {
    this.getGenders();
    this.alunoForm = new FormGroup({
      studentName: new FormControl(this.aluno.name, [Validators.required]),
      studentGender: new FormControl(this.aluno.genre, [Validators.required]),
      studentBirth: new FormControl(this.aluno.dateBirth, [Validators.required])
    });

  }

  getGenders(){

  }

  submitForm() {
    const aluno = this.alunoForm.value;
    aluno.id = this.aluno.id;
    this.childSubmit.emit(aluno);
  }

}
