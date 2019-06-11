import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Competidor } from 'src/app/core/competidor/competidor';
import { CompetidorService } from 'src/app/core/competidor/competidor.service';

import { TokenService } from 'src/app/core/token/token.service';

@Component({
  selector: 'app-competidor-rank',
  templateUrl: './competidor-rank.component.html',
  styleUrls: ['./competidor-rank.component.scss']
})
export class CompetidorRankComponent implements OnInit {

  displayedColumns: string[] = ['posicao','name', 'grade', 'finalScore', 'award'];
  ranking: MatTableDataSource<any[]>;
  categoria: String = "Iniciação 1";

  mock = [

    {
      posicao: "1",
      name: "Daenarys Targeryen",
      grade: "1º ano do Ensino Fundamental",
      finalScore: "90"
    },
    {
      posicao: "2",
      name: "Sansa Stark",
      grade: "2º ano do Ensino Fundamental",
      finalScore: "70"
    },
    {
      posicao: "3",
      name: "Khal Drogo",
      grade: "1º ano do Ensino Fundamental",
      finalScore: "43"
    }

  ]

  constructor(
    private competidorService: CompetidorService,
  ) {
    
   }

  ngOnInit() {
    //this.ranking = new MatTableDataSource<any>(this.mock);
    this.getCompetidores();
  }

  getCompetidores() {
      this.competidorService.getRanking(this.categoria).subscribe(res=>{
        this.ranking = new MatTableDataSource<any>(res['content']);
        console.log(res); // verificando resposta
      }, err=>{
        console.log(err);
      })   
  }

  award(competidor: Competidor, typeAward: string){
    this.competidorService.postAward(competidor.id, typeAward);
  }

}
