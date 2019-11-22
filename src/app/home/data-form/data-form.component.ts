import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  dataForm: FormGroup;
  datas : any = {};

  ngOnInit() {
    this.dataService.getDatas().subscribe(res=>{
      this.datas = res;

      console.log("this.datas ", this.datas);
      
      this.dataForm = new FormGroup({
        subscribeDate: new FormControl(this.datas.subscribeDate, []),
        iniciacao1And2PubLevelOneDate: new FormControl(this.datas.iniciacao1And2PubLevelOneDate, []),
        iniciacao1And2LevelOneDate: new FormControl(this.datas.iniciacao1And2LevelOneDate, []),
        programacaoLevelOneDate: new FormControl(this.datas.programacaoLevelOneDate, []),
        iniciacao1And2LevelTwoDate: new FormControl(this.datas.iniciacao1And2LevelTwoDate, []),
        programacaoLevelTwoDate: new FormControl(this.datas.programacaoLevelTwoDate, []),
        resultsDate: new FormControl(this.datas.resultsDate, []),
        awardDate: new FormControl(this.datas.awardDate, []),
        highSubscribeDate: new FormControl(this.datas.highSubscribeDate, []),
        highOlimpiadDate: new FormControl(this.datas.highOlimpiadDate, []),
        highResultsDate: new FormControl(this.datas.highResultsDate, []),
        highAwardDate: new FormControl(this.datas.highAwardDate, []),
      });
    
    })

  }

  onSubmit(){
    this.dataService.updateDatas(this.dataForm.value).subscribe(res=>{
      this.datas = res;
      this.router.navigate(['/dashboard'] );

    })
  }

}
