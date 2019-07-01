import { Component, OnInit } from '@angular/core';
import { CompetidorService } from 'src/app/core/competidor/competidor.service';
import { MatTableDataSource, MatSnackBar, Sort } from '@angular/material';
import {FormGroup, FormControl , Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { saveAs } from 'file-saver';
import { TokenService } from 'src/app/core/token/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competidor',
  templateUrl: './competidor.component.html',
  styleUrls: ['./competidor.component.scss']
})
export class CompetidorComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'name', 'genre', 'dateBirth', 'category', 'grade', 'scoreLevelOne','scoreLevelTwo'];
  competidoresList: MatTableDataSource<any[]>;
  uploadForm : FormGroup;
  lista: any;
  segundaFase = false;
  porcentagemForm: FormGroup;
  fase = "Competidores - 1º Fase";
  categoria: String = "";
  tipoDaEscola = "";
  sortedData: any[];

  nomeArquivo: String = "Enviar Planilha";

  constructor(
    private competidorService: CompetidorService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public tokenService : TokenService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    this.route.data.subscribe((data)=>{
      this.categoria = data.value;
    })
    this.competidoresList = new MatTableDataSource<any>();
    this.getCompetidores();
   
    this.uploadForm = this.formBuilder.group({
      profile:['']
    });
    this.porcentagemForm = new FormGroup({
      porcentagem: new FormControl('',[Validators.required])
    })

  }

  tipoEscola(teste){
    this.tipoDaEscola = teste.value;
    this.getCompetidores();
  }

  getCompetidores() {
    if(this.tokenService.hasPrivilege('I_SC')){
      this.competidorService.getCompetidores(this.categoria, this.tipoDaEscola).subscribe(res=>{
        this.competidoresList = new MatTableDataSource<any>(res['content']);
        this.sortedData = this.competidoresList.data.slice();
      }, err=>{
        console.log(err);
      })
    }else{
      this.competidorService.getCompetidoresByDelegado().subscribe(res => {
        this.competidoresList = new MatTableDataSource<any>(res['content']);
        this.sortedData = this.competidoresList.data.slice();
      })
    }
    
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

  enviarPlanilha(){
      this.competidorService.createCompetidoresByExcel(this.lista).subscribe(res=>{
        this.openSnackBar("Competidores Cadastrados Com Sucesso", []);
        this.getCompetidores();
      })
    
  }
  sortData(sort: Sort) {
    const data =  this.competidoresList.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'scoreLevelOne': return this.compare(a['scoreLevelOne'], b['scoreLevelOne'], isAsc);
        case 'scoreLevelTwo': return this.compare(a['scoreLevelTwo'], b['scoreLevelTwo'], isAsc);
        case 'name' : return this.compare(a['name'], b['name'], isAsc)
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  get1Fase(){
    this.fase = "Competidores - 1º Fase";
    this.getCompetidores();
  }

  get2Fase(){
    this.fase = "Competidores - 2º Fase";
    let segunda = this.competidoresList.data.filter(res=>{
      return res['level'] === "Segunda Fase";
    });
    this.segundaFase = segunda.length > 0;

    this.competidoresList = new MatTableDataSource<any>(segunda);
    this.sortedData = this.competidoresList.data.slice();
    this.openSnackBar("Alunos classificados para segunda fase", []);
  }

  baixarPlanilhaEx(){
    this.competidorService.downloadPlanilhaEx().subscribe(data => saveAs(data, `Planilha Exemplo Competidor.xlsx`));
  }

  openSnackBar(message: string, config=[]) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }

  submitForm(formDirective: FormGroupDirective) {
    this.competidorService.porcentagemClassificadosSegundaFase(this.porcentagemForm.value.porcentagem).subscribe(res=>{
      this.openSnackBar(this.porcentagemForm.value.porcentagem+"% classificados");
    })
  }


}
