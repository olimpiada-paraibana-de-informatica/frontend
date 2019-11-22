import { element } from 'protractor';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResultadoService } from 'src/app/core/resultado/resultado.service';
import { AnoResultado } from 'src/app/core/resultado/anoResultado';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  
  constructor(private dataService: DataService, private resultadoService: ResultadoService, private router: Router,  private changeDetectorRefs: ChangeDetectorRef) { }
  
  datas : any = {};
  categoria = "";
  objetivo = "A Olimpíada Paraibana de Informática visa despertar nos alunos o interesse em computação imprescindível"+
   "na formação básica dos estudantes atualmente, através de uma atividade que envolve desafios motivadores e competição saudável. "+
   "Esta competição também permite que os competidores possam conhecer de forma mais abrangente a carreira na área."+
   " Já para os alunos do ensino superior, a OPI visa estimular os alunos a aprimorarem e aprofundarem o conhecimento em Programação e Algoritmos."+
   " Além disso, a olimpíada almeja preparar melhor e despertar o interesse de alunos paraibanos para as competições nacionais e internacionais de programação, como a Olimpíada Brasileira e Internacional de Informática, e a ACM/ICPC."+
   " Estes alunos possivelmente se motivarão a entrar no curso de Ciência da Computação, e o conhecimento adquirido na preparação será muito valioso para a sua formação. A organização da OPI está a cargo do curso de Ciência da Computação da Universidade Federal de Campina Grande.";
  anosResultados  = [];
  displayedColumnsTableResultado: string[] = ['iniciacao1', 'iniciacao1Pub', 'iniciacao2', 'iniciacao2Pub', 'programacao', 'avancadoJunior', 'avancadoSenior'];
  descricaoResultado = "Confira os resultados dos alunos nas edições da OPI a seguir. Além disso, veja os principais resultados dos alunos paraibanos nas principais competições nacionais e internacionais de programação";

  ngOnInit() {
    this.setCategoria(1);
    this.setAnosResultados();

    this.dataService.getDatas().subscribe(res=>{
      this.datas = res;
    })
  }

  setCategoria(categoria){
    switch(categoria) { 
      case 1: {
        this.categoria = "Esta categoria se destina aos alunos do 1o ao 4o ano do ensino fundamental. Nas duas fases, a prova será composta por cerca de 20-25 questões de múltipla escolha. As questões envolverão raciocínio lógico e analítico envolvendo questões similares aos jogos de Sudoku. Veja exemplos de questões aqui. Cada escola será responsável por aplicar a prova da 1a e 2a fase. Além disso, será responsável pela correção das provas da 1a fase e deverá guardar todas as folhas de respostas até o final do ano. Serão classificados para a 2a fase pelo menos os 25% dos melhores alunos em cada escola que (i) realizarem a prova nessa categoria e (ii) não zerarem a prova. A nota final será a nota da 1a fase mais 20 vezes a nota da 2a fase."; 
         break; 
      }case 2: { 
         this.categoria = "Esta categoria se destina aos alunos do 5o ao 8o ano do ensino fundamental. Nas duas fases, a prova será composta por cerca de 20-30 questões de múltipla escolha. As questões envolverão raciocínio lógico e analítico. Esta prova corresponde a Modalidade Iniciação Nível 1 e 2 da Olimpíada Brasileira de Informática. Uma subcategoria é exclusivamente destinada para alunos de escola pública. Veja exemplos de questões aqui. Cada escola será responsável por aplicar a prova da 1a e 2a fase. Além disso, será responsável pela correção das provas da 1a fase e deverá guardar todas as folhas de respostas até o final do ano. Serão classificados para a 2a fase pelo menos os 25% dos melhores alunos em cada escola que (i) realizarem a prova nessa categoria e (ii) não zerarem a prova. A nota final será a nota da 1a fase mais 20 vezes a nota da 2a fase."; 
         break; 
      }case 3: {
        this.categoria = "Esta categoria se destina aos alunos do 9o ano do ensino fundamental e alunos do ensino médio. A prova desta categoria será composta por cerca de 5 problemas. As duas fases serão realizadas em laboratório com um computador por aluno similar a OBI. As questões envolverão conhecimento de técnicas básicas de programação, estruturas de dados básicas e algoritmos. Esta prova corresponde a Modalidade Programação da Olimpíada Brasileira de Informática. Veja exemplos de questões nos sites da OBI e no URI Online Judge. Caso não saiba programar, considere fazer os cursos online. Cada escola será responsável por aplicar a prova da 1a e 2a fase. Além disso, será responsável pela correção das provas da 1a fase e deverá guardar todas as folhas de respostas até o final do ano. Serão classificados para a 2a fase pelo menos os 25% dos melhores alunos em cada escola que (i) realizarem a prova nessa categoria e (ii) não zerarem a prova. A nota final será a nota da 1a fase mais 20 vezes a nota da 2a fase. As duas fases seguirão o formato da OBI com correção após a prova.";
        break;
      }case 4: {
        this.categoria = "Esta categoria se destina aos alunos que não tenham cursado ou estejam cursando a disciplina de Estrutura de Dados. A prova desta categoria será composta por cerca de 10 questões. Esta prova será similar a competição da ACM/ICPC. As linguagens permitidas serão: C, C++, Java, Pascal e Python. Cada equipe deve ser formada por 3 pessoas. Veja exemplos de questões nos sites da maratona de programação e no URI Online Judge.";
        break;
      }case 5: {
        this.categoria = "Esta categoria se destina aos alunos que estejam cursando até o primeiro ano do mestrado. A prova desta categoria será composta por cerca de 10 questões. Esta prova será similar a competição da ACM/ICPC. As linguagens permitidas serão: C, C++, Java, Pascal e Python. Cada equipe deve ser formada por 3 pessoas. Veja exemplos de questões nos sites da maratona de programação e no URI Online Judge.";
        break;
      }
      default: { 
        this.categoria = "";
         break; 
      } 
   } 
  }

  setAnosResultados(){
    this.resultadoService.getAnoResultados().subscribe(res=>{
          let listaIniciacao1 = [];
          let listaIniciacao1Pub = [];
          let listaIniciacao2 = [];
          let listaIniciacao2Pub = [];
          let listaProgramacao = [];
          let listaAvancadoJunior = [];
          let listaAvancadoSenior = [];


          let qtdMaxAnos = 0;
          res.forEach(element => {
            if(element.year.length > qtdMaxAnos){
              qtdMaxAnos = element.year.length;
            }

            switch(element.type) { 
              case 'iniciacao1': {
                listaIniciacao1 = element.year; 
                break; 
              }case 'iniciacao1Pub': { 
                listaIniciacao1Pub = element.year; 
                break; 
              }case 'iniciacao2': {
                listaIniciacao2 = element.year; 
                break;
              }case 'iniciacao2Pub': {
                listaIniciacao2Pub = element.year; 
                break;
              }case 'programacao': {
                listaProgramacao = element.year; 
                break;
              }case 'avancadoJunior': {
                listaAvancadoJunior = element.year; 
                break;
              }case 'avancadoSenior': {
                listaAvancadoSenior = element.year; 
                break;
              }
              default: { 
                break; 
              } 
            }
      });

      let listaAux = [];

      for (let i = 0; i < qtdMaxAnos; i++) {
        let obj = {
          iniciacao1 : listaIniciacao1[i] ? listaIniciacao1[i] : "",
          iniciacao1Pub : listaIniciacao1Pub[i] ? listaIniciacao1Pub[i] : "",
          iniciacao2 : listaIniciacao2[i] ? listaIniciacao2[i] : "",
          iniciacao2Pub : listaIniciacao2Pub[i] ? listaIniciacao2Pub[i] : "",
          programacao : listaProgramacao[i] ? listaProgramacao[i] : "",
          avancadoJunior : listaAvancadoJunior[i] ? listaAvancadoJunior[i] : "",
          avancadoSenior : listaAvancadoSenior[i] ? listaAvancadoSenior[i] : "",
        };
        listaAux.push(obj);
      }
      this.anosResultados = this.anosResultados.concat(listaAux);

      this.changeDetectorRefs.detectChanges();

    });



  }

  openResult(anoSelecionado , tipo){
    if(String(anoSelecionado).trim() === "") return;
    
    this.router.navigate(['/resultado'] , { queryParams: { ano: anoSelecionado, tipo : tipo } });
    
  }
  
  openMaisResultado(){
    this.router.navigate(['/maisResultado'] );

  }

}
