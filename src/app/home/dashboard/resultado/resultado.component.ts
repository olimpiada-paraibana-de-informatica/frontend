import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultadoService } from 'src/app/core/resultado/resultado.service';
import { Resultado } from 'src/app/core/resultado/resultado';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private resultadoService: ResultadoService,
  ) { }

  ano = '';
  tipo = '';
  resultado : Resultado = new Resultado();
  displayedColumnsResultado: string[] = ["nome", "escolaCidade"];


  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      if(params['ano'] && params['tipo']){
        this.ano = params['ano'];
        this.tipo = params['tipo'];
      }else{
        this.router.navigate(['/']);
      }
    });
  
    this.resultadoService.getResultByYearAndType(this.ano, this.tipo).subscribe(res=>{
      this.resultado = res;
    });
  }

  getTipo(){
    switch(this.tipo) { 
      case 'iniciacao1': {
        return "Iniciação 1"; 
      }case 'iniciacao1Pub': { 
        return "Iniciação 1 Pub."
      }case 'iniciacao2': {
        return "Iniciação 2"
      }case 'iniciacao2Pub': {
        return "Iniciação 2 Pub."
      }case 'programacao': {
        return "Programação"
      }case 'avancadoJunior': {
        return "Avançado Júnior"
      }case 'avancadoSenior': {
        return "Avançado Senior"
      }
      default: { 
        return ""
      } 
    }
  }

}
