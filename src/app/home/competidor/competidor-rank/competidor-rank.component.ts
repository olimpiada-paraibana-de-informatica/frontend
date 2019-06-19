import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Competidor } from 'src/app/core/competidor/competidor';
import { CompetidorService } from 'src/app/core/competidor/competidor.service';

import { TokenService } from 'src/app/core/token/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-competidor-rank',
  templateUrl: './competidor-rank.component.html',
  styleUrls: ['./competidor-rank.component.scss']
})
export class CompetidorRankComponent implements OnInit {

  displayedColumns: string[] = ['actions','posicao','name', 'grade', 'finalScore', 'award'];
  ranking: MatTableDataSource<any[]>;
  categoria: String = "";
  tipoDaEscola = '';

  constructor(
    private competidorService: CompetidorService,
    private tokenService : TokenService,
    private route: ActivatedRoute
  ) {
    
   }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.categoria = data.value;  
    });
    this.ranking = new MatTableDataSource<any>();
    this.getCompetidores();
  }

  tipoEscola(teste){
    this.tipoDaEscola = teste.value;
    this.getCompetidores();
  }

  getCompetidores() {
    if(this.tokenService.hasPrivilege('I_SC')){
      this.competidorService.getRanking(this.categoria, this.tipoDaEscola).subscribe(res=>{
        this.ranking = new MatTableDataSource<any>(res['content']);
      }, err=>{
        console.log(err);
      })
    }
  }

  award(competidor, typeAward: string){
    this.competidorService.postAward(competidor.id, typeAward).subscribe(res=>{
      console.log(res);
      this.getCompetidores();
    },err=>{
      console.log(err);
    });
  }

  dowloadCertificado(competidor){
    this.competidorService.downloadCertificado(competidor.id, competidor.award).subscribe(data=> saveAs(data, `Certificado ${competidor.name}- .xlsx`))
  }

}
