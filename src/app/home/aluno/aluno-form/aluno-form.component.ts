import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormControl , Validators, FormGroupDirective } from '@angular/forms';
import {ValidatorsForm} from '../../../shared/validatorsForm';
import {Aluno} from '../../../core/aluno/aluno';
import {AlunoService} from '../../../core/aluno/aluno.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator, MatSnackBar, MatDialog} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/core/token/token.service';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';
import { RemoveDialogComponent } from 'src/app/shared/components/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {

  alunosList: MatTableDataSource<any[]>;
  displayedColumns: string[] = ['actions','name','genre', 'dateBirth'];
  @Input() textSubmit: string;
  hide = true;
  hideConfirm = true;
  @Input() aluno: Aluno;
  alunoForm: FormGroup;
  @Output() childSubmit = new EventEmitter<Aluno>();
  selectedIndex: number;
  edit = false;
  delegado: any;

  selectedPrivileges: SelectionModel<string>;

  genders = [{
    id: "FEMININO",
    name: "Feminino"
  },{
    id: "MASCULINO",
    name:"Masculino"
  },
    {
      id:"OUTRO",
      name: "Outro"
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private alunoService: AlunoService,
    private delegadoService: DelegadoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.alunosList = new MatTableDataSource<any>();
    this.getStudents();
    this.getGenders();
    this.alunoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      dateBirth: new FormControl('', [Validators.required])
    });


  }

  getStudents(){
    this.alunoService.getAlunosByDelegado().subscribe(res=>{
      console.log(res);
      this.alunosList = new MatTableDataSource<any>(res['content']);
    })
  }

  getGenders(){
    this.genders = [{
      id: "FEMININO",
      name: "Feminino"
    },{
      id: "MASCULINO",
      name:"Masculino"
    },
      {
        id:"OUTRO",
        name: "Outro"
      }];
  }

  addDependent(formDirective: FormGroupDirective) {
      this.alunosList.data = [...this.alunosList.data, this.alunoForm.value];
      this.alunoForm.reset();
      formDirective.resetForm();
  }


  selectDependent(dependent, index) {
    console.log(dependent);
    this.alunoForm = new FormGroup({
      name: new FormControl(dependent.name, [Validators.required]),
      genre: new FormControl(dependent.genre, [Validators.required]),
      dateBirth: new FormControl(dependent.dateBirth, [Validators.required]),
    });
    this.selectedIndex = index;
    this.edit = true;
  }

  selectGender(id){
    this.genders.forEach(element => {
      if(element.id === id){
        return element.name
      }
    });
  }

  editDependent(formDirective: FormGroupDirective) {
      const data = this.alunosList.data;
      data[this.selectedIndex] = this.alunoForm.value;
      this.alunosList.data = [...data];
      this.selectedIndex = null;
      this.edit = false;
      this.alunoForm.reset();
      formDirective.resetForm();
  }


  submitForm(formDirective: FormGroupDirective) {
    if (this.edit) this.editDependent(formDirective);
    else this.addDependent(formDirective);
  }

  removeDependent(row, i){
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      height: '300px',
      width: '400px',
      data: {
        title: 'Remover estudante',
        mensagem: 'Tem certeza que deseja remover ' +row.name+'?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alunosList.data = this.alunosList.data.splice(i+1, 1);
      }
    });
  }

  

  enviarLista(){
    this.alunoService.createAlunoByDelegado(this.alunosList.data).subscribe(res=>{
      this.openSnackBar("Estudantes cadastrados com sucesso", []);
      this.getStudents();
    })
  }



  openSnackBar(message: string, config) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }

}
