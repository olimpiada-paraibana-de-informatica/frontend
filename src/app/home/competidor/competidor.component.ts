import { Component, OnInit } from '@angular/core';
import { CompetidorService } from 'src/app/core/competidor/competidor.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-competidor',
  templateUrl: './competidor.component.html',
  styleUrls: ['./competidor.component.scss']
})
export class CompetidorComponent implements OnInit {

  displayedColumns: string[] = ['actions','name','genre', 'dateBirth','category','grade','score'];
  competidoresList: MatTableDataSource<any[]>;
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
    private competidorService : CompetidorService
  ) { }

  ngOnInit() {
    this.competidoresList = new MatTableDataSource<any>();
    this.getCompetidores();
  }

  getCompetidores(){
    this.competidoresList = new MatTableDataSource<any>(this.mock);
   this.competidorService.getCompetidoresByDelegado().subscribe(res=>{
     console.log(res);
     this.competidoresList = new MatTableDataSource<any>(res['content']);
   })
  }

}
