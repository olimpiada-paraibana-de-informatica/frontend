import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorsForm } from 'src/app/shared/validatorsForm';
import { Delegado } from 'src/app/core/delegado/delegado';
import { DelegadoService } from 'src/app/core/delegado/delegado.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-delegado-form',
  templateUrl: './delegado-form.component.html',
  styleUrls: ['./delegado-form.component.scss']
})
export class DelegadoFormComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name'];
  @Input() textSubmit: string;
  hide = true;
  hideConfirm = true;
  @Input() delegado: Delegado;
  delegadoForm: FormGroup;
  @Output() childSubmit = new EventEmitter<Delegado>();
  
  categories = new MatTableDataSource<any>([]);
  selectedPrivileges: SelectionModel<string>;
  

  cities = [{
    name: "Escolha um estado"
  }];

  types = [{
    status: true,
    name: "Pública"
  },{
    status: false,
    name: "Privada"
  }]

  states = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private delegadoService: DelegadoService) { 
  }

  ngOnInit() {
    
    this.delegadoForm = new FormGroup({
      delegateName: new FormControl(this.delegado.delegateName, [Validators.required]),
      delegateEmail: new FormControl(this.delegado.delegateEmail, [Validators.required, Validators.email]),
      emailConfirm: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(this.delegado.password, [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
      schoolName: new FormControl(this.delegado.schoolName, [Validators.required]),
      schoolCityCbo: new FormControl(this.delegado.schoolCityCbo, [Validators.required]),
      opiCategories: new FormControl(this.delegado.opiCategories, []),
      schoolType: new FormControl(this.delegado.isPublic,[Validators.required]),
      schoolStateCbo: new FormControl(this.delegado.schoolStateCbo, [Validators.required])
    }, {
      validators: [ ValidatorsForm.MatchEmail, ValidatorsForm.MatchPassword ]
    });
    this.loadPrivileges();
    const categories = this.delegado.opiCategories.map(category => category.key);
    this.selectedPrivileges = new SelectionModel<string>(true, categories);
    this.getStates();
  }

  getCities(estado){
    this.delegadoService.getCities(estado).subscribe(res=>{
      this.cities = res;
    })
  }

  getStates(){
      this.delegadoService.getStates().subscribe(res=>{
        this.states = res;
      })
  }

  loadPrivileges() {
    this.delegadoService.getCategories().subscribe((res: any[]) => {
      this.categories = new MatTableDataSource<any>(res);
      this.categories.paginator = this.paginator;
      const numSelected = this.selectedPrivileges.selected.length;
      const numRows = this.categories.data.length;
      if(numSelected === numRows){
        this.categories.data.forEach((row: any) => {
          if(!this.selectedPrivileges.isSelected(row.key)){
            this.selectedPrivileges.toggle(row.key)
          }
          this.selectedPrivileges.select(row.key)
        });
      }
    });
  }
  deselectAll(){
    this.categories.data.forEach((row: any) => {
          if(this.selectedPrivileges.isSelected(row.key)){
            this.selectedPrivileges.toggle(row.key)
          }  
        });
        this.selectedPrivileges.clear();
  }

  isAllSelected() {
    const numSelected = this.selectedPrivileges.selected.length-1;
    const numRows = this.categories.data.length;
    return numSelected === numRows;
  }

  selectAll() {
    
    this.isAllSelected() ?
        this.selectedPrivileges.clear() :
        this.categories.data.forEach((row: any) => {
          if(!this.selectedPrivileges.isSelected(row.key)){
            this.selectedPrivileges.toggle(row.key)
          }
          this.selectedPrivileges.select(row.key)
        });
  }

  submitForm(){
    this.delegadoForm.value.opiCategories = this.selectedPrivileges.selected;
    const delegado = this.delegadoForm.value;
    delegado.id = this.delegado.id;
    this.childSubmit.emit(delegado);
  }

}
