import { Component, OnInit } from '@angular/core';
import { CompetidorService } from 'src/app/core/competidor/competidor.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import {FormGroup, FormControl , Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-competidor',
  templateUrl: './competidor.component.html',
  styleUrls: ['./competidor.component.scss']
})
export class CompetidorComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'name', 'genre', 'dateBirth', 'category', 'grade', 'score'];
  competidoresList: MatTableDataSource<any[]>;
  uploadForm : FormGroup;
  lista: any;
  mock = [

    {
      category: "INICIACAO",
      dateBirth: "1996-11-29",
      genre: "Masculino",
      grade: '4º ano',
      name: 'Marcos Roberto',
      score: '6.0'
    },

    {
      category: "INICIACAO",
      dateBirth: "1996-03-01",
      genre: "Feminino",
      grade: '4º ano',
      name: 'Paula Fernandes',
      score: '8.0'
    }

  ]

  nomeArquivo: String = "Enviar Planilha";

  constructor(
    private competidorService: CompetidorService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.competidoresList = new MatTableDataSource<any>();
    this.getCompetidores();

    this.uploadForm = this.formBuilder.group({
      profile:['']
    });

  }

  getCompetidores() {
    this.competidorService.getCompetidoresByDelegado().subscribe(res => {
      console.log(res);
      this.competidoresList = new MatTableDataSource<any>(res['content']);
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

  enviarPlanilha(){
    this.competidorService.createCompetidoresByExcel(this.lista).subscribe(res=>{
      this.openSnackBar("Competidores Cadastrados Com Sucesso", []);
      this.getCompetidores();
    })
  }

  baixarPlanilhaEx(){
    this.competidorService.downloadPlanilhaEx().subscribe(data => saveAs(data, `Planilha Exemplo Competidor.xlsx`));
  }

  openSnackBar(message: string, config) {
    this.snackBar.open(message, 'fechar', {
      duration: 9000,
      panelClass: config
    });
  }


}
