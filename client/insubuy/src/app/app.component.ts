import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  form = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    citizen: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required)
  });
  form1: FormGroup;
  policy = [];

  constructor(private formbuilder: FormBuilder){
    this.form1 = this.formbuilder.group({
      policy:['']
    });

    this.policy = this.getPolicy();
  }

  getPolicy(){
    return[
      {id: '1', range: 'select a policy'},
      {id: '2', range: '50,000', value: '50'},
      {id: '3', range: '100,000', value: '100'},
      {id: '4', range: '250,000', value: '250'},
      {id: '5', range: '500,000', value: '500'}
    ];
  }
  public tableData:boolean = false;
  public newDate: any;
  public startDateFlag: boolean = false;
  public endDateFlag: boolean = false;
  public policyFlag: boolean = false;
  public citizenFlag: boolean = false;
  public ageFlag: boolean = false;
  public stateFlag: boolean = false;
  private startDateValue: any;
  private endDateValue: any;
  private policyValue: any;
  private citizenValue: any;
  private ageValue: any;
  private currYear: any;
  private stateValue: any;
  public totalData: any;

  ngOnInit() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    this.currYear = today.getFullYear();
    this.newDate = this.currYear + '-' + mm + '-' + dd;
  }

  startDateBlur(value: any){
    if(!value || value < this.newDate){
      this.startDateFlag = true;
    }
    else {
      this.startDateFlag = false;
      this.startDateValue = value;
    }
  }

  endDateBlur(value: any){
    if(!value || value <= this.startDateValue){
      this.endDateFlag = true;
    }
    else {
      this.endDateFlag = false;
      this.endDateValue = value;
    }
  }

  policyChange(policy: any){
    if(parseInt(policy.target.value) - 1 === 0){
      this.policyFlag = true;
    }
    else {
      this.policyFlag = false;
      this.policyValue = this.policy[parseInt(policy.target.value) - 1].range;
    }
  }

  citizenBlur(citizen: any){
    let regex = /^[A-Za-z]+$/;
    if(citizen && citizen.match(regex)){
      this.citizenFlag = false;
      this.citizenValue = citizen;
    }
    else {
      this.citizenFlag = true;
    }
  }

  ageBlur(age: any){
    let regex = /^[0-9]+$/;
    if(age && age.match(regex) && parseInt(age) < 100 || (this.currYear-parseInt(age) < 100)){
      this.ageFlag = false;
      this.ageValue = age;
    }
    else {
      this.ageFlag = true;
    }
  }

  stateBlur(state: any){
    let regex = /^[A-Za-z]+$/;
    if(state && state.match(regex)){
      this.stateFlag = false;
      this.stateValue = state;
    }
    else {
      this.stateFlag = true;
    }
  }

  resetLink(){
    this.startDateFlag = false;
    this.startDateValue = '';
    this.endDateFlag = false;
    this.endDateValue = '';
    this.policyFlag = false;
    this.policy = [{id: '1', range: 'select a policy'},
    {id: '2', range: '50,000', value: '50'},
    {id: '3', range: '100,000', value: '100'},
    {id: '4', range: '250,000', value: '250'},
    {id: '5', range: '500,000', value: '500'}];
    this.citizenFlag = false;
    this.citizenValue = '';
    this.ageFlag = false;
    this.ageValue = '';
    this.stateFlag = false;
    this.stateValue = '';
  }

  getQuote = async () => {
    const postParams = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate: this.startDateValue, endDate: this.endDateValue, citizenShip: this.citizenValue, policyMax: this.policyValue, age: this.ageValue, mailingState: this.stateValue })
    };

    const getParams = {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
    };
    try {
        const fetchResponse = await fetch(`http://localhost:8080/quotes/`, postParams);
        const data = await fetchResponse.json();
        if(data.success){
          try {
            const fetchResponse1 = await fetch(`http://localhost:8080/quotes/`, getParams);
            this.tableData = true;
            this.totalData = await fetchResponse1.json();
            this.totalData = this.totalData.quotes;
          } catch(e){
            return e;
          }
        }
    } catch (e) {
        return e;
    }    
  }
}
