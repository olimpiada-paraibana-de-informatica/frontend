import { Component, OnInit } from '@angular/core';
import { GraficoService } from 'src/app/core/grafico/grafico.service';


declare var vegaEmbed: any;


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})

export class GraficoComponent implements OnInit {

  constructor(    private graficoService: GraficoService  ) { }

  categoria = "";

  yourVlSpec2 : any = {};
  yourVlSpec : any = {};
  listaInternacional = [];
  displayedColumnsTableResultado: string[] = ['year', 'nomes', 'school', 'details'];

  
  ngOnInit() {
    
    this.graficoService.getGraphObi().subscribe(res=>{
      console.log("reposta grafico ", res);
      this.yourVlSpec2 = res;
      vegaEmbed('#vis2', this.yourVlSpec2);
    });
    
    this.graficoService.getGraphSbc().subscribe(res=>{
      console.log("reposta grafico sbc ", res);
      this.yourVlSpec = res;
      vegaEmbed('#vis', this.yourVlSpec);
    });
    
    this.graficoService.getChampionInternacional().subscribe(res=>{
      console.log("reposta lista internacional ", res);
      this.listaInternacional = res;
    });
  }

  changeSpec() {
    let listaObjFilter = JSON.parse(JSON.stringify(this.yourVlSpec2));
    let valuesAtualizado = [];

    console.log("-------- ", this.yourVlSpec2.data.values.length);
    
    this.yourVlSpec2.data.values.forEach(element => {
      if(element.category === this.categoria){
        valuesAtualizado.push(element);
      } 
    });
    
    listaObjFilter.data.values = valuesAtualizado;
    
    console.log("-------- 2 --- ", listaObjFilter.data.values.length);


    vegaEmbed('#vis2',  listaObjFilter);
  };
  

  
}
