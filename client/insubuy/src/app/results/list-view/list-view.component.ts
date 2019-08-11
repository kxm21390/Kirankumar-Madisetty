import { Component, OnInit, Input } from '@angular/core';

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
}
