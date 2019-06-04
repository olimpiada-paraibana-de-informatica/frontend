import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-competidor-rank',
  templateUrl: './competidor-rank.component.html',
  styleUrls: ['./competidor-rank.component.scss']
})
export class CompetidorRankComponent implements OnInit {

  displayedColumns: string[] = ['posicao','name', 'grade', 'finalScore'];
  ranking: MatTableDataSource<any[]>;

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

  constructor() { }

  ngOnInit() {
    this.ranking = new MatTableDataSource<any>(this.mock);
  }

}
