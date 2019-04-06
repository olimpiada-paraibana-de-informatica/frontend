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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(alunoService: AlunoService) { }

  ngOnInit() {
  }

  submitForm() {
    const aluno = this.alunoForm.value;
    aluno.id = this.aluno.id;
    this.childSubmit.emit(aluno);
  }

}
