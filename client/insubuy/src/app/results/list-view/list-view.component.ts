import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() listData: any;
  public price: boolean = true;
  public name: boolean = true;
  public descriptionValue: any;
  public typeValue: any;
  public sectionValue: any;
  public bestSellersValue: any;
  public recordCheck: boolean;
  public compareError: boolean = false;
  public modalShow: boolean = false;
  public modalArray = [];

  @Output() modalValueEmit = new EventEmitter(); 

  public modal = document.getElementById("myModal");
  public btn = document.getElementById("myBtn");
  public span = document.getElementsByClassName("close")[0];

  constructor() { }

  ngOnInit() {

  }

  priceSort(){
    if(this.price){
      this.listData.sort((a,b) => a.price-b.price);
    } else {
      this.listData.sort((a,b) => b.price-a.price);
    }
    this.price = !this.price;
  }

  nameSort(){
    this.listData.sort((a, b)=>{
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if(this.name){
        if (x < y) {return -1;}
        if (x > y) {return 1;}
      } else {
        if (x < y) {return 1;}
        if (x > y) {return -1;}
      }
      return 0;
    });

    this.name = !this.name;
  }

  sectionFilter(value: any, index: number){
    let filter = value.toUpperCase();
    let table = document.getElementById("myTable");
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[index];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      } 
    }
  }

  recordChecked(checkValue: any, record: any){
    let removeIndex: number;
    if(checkValue.target.checked){
      this.modalArray.push(record);
    } else {
      this.modalArray = this.modalArray.map((value, index) => {
          if(value.id !== record.id) {
            return value;
          } else {
            removeIndex = index;
          }
      });

      this.modalArray.splice(removeIndex, 1);
    }
  }

  compareQuotes(){
    if(this.modalArray.length < 2 || this.modalArray.length > 4){
      this.compareError = true;
      this.modalShow = false;

    } else {
      this.compareError = false;
      this.modalShow = true;
      this.modalValueEmit.emit(true);
    }
  }

  closeModal(){
    this.modalShow = false;
    this.modalValueEmit.emit(false);
  }

}
