import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup, FormControl , Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import {ValidatorsForm} from '../../../shared/validatorsForm';
import {Aluno} from '../../../core/aluno/aluno';
import {AlunoService} from '../../../core/aluno/aluno.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatPaginator, MatSnackBar, MatDialog} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/core/token/token.service';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';
import { RemoveDialogComponent } from 'src/app/shared/components/remove-dialog/remove-dialog.component';
import { saveAs } from 'file-saver';

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
  alunoPlanilha:  MatTableDataSource<any[]>;
  nomeArquivo: String = "Enviar Planilha";

  lista: any;

  selectedPrivileges: SelectionModel<string>;

  genders = [];

  uploadForm : FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private alunoService: AlunoService,
    private delegadoService: DelegadoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.alunosList = new MatTableDataSource<any>();
    this.getStudents();
    this.getGenders();

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

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

  onFileChange(teste){
    let reader = new FileReader();
    let file = teste.target.files[0];
    this.nomeArquivo = file.name;
    if (teste.target.files.length > 0) {
      const file = teste.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    this.lista = formData;
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
        id:"NÃO_BINÁRIO",
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
    if(this.lista){
      this.alunoService.createAlunosByExcel(this.lista).subscribe(res=>{
        this.openSnackBar("Estudantes cadastrados com sucesso", []);
        this.getStudents();
      })
      console.log("planilha")
    }else{
      this.alunoService.createAlunoByDelegado(this.alunosList.data).subscribe(res=>{
        this.openSnackBar("Estudantes cadastrados com sucesso", []);
        this.getStudents();
      });
      console.log("lista")
    }
    
  }

  enviarPlanilha(event : any[]){
    this.alunoService.createAlunosByExcel(event).subscribe(res=>{
      this.openSnackBar("Estudantes cadastrados com sucesso", []);
      this.getStudents();
    });
  }

  baixarPlanilhaEx(){
    this.alunoService.downloadPlanilhaEx().subscribe(data => saveAs(data, `Planilha Exemplo Aluno.xlsx`));
  }

  openSnackBar(message: string, config) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }

}
