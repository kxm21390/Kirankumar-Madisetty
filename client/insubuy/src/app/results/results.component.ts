import { Component, OnInit, Input } from '@angular/core';
import { ListViewComponent } from './list-view/list-view.component';
import { GridViewComponent } from './grid-view/grid-view.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  @Input() data: any;
  public mode:number = 1;
  
  constructor() { }

  ngOnInit() {
    
  }

  displayMode(value: number){
    this.mode = value;
  }

}
