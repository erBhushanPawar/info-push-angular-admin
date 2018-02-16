import { BaseService } from './../../services/base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  cat = {
    name : "Sample Cat",
    catId : Math.random().toString(20).replace("0.","")
  }
  constructor(private baseService:BaseService) { }

  ngOnInit() {
  }

  saveCat(){
    this.baseService.saveCategory(this.cat).subscribe((res:any)=>{
      if (res.result && res.result.isSaved){
        alert("Saved category")
      }
      console.log(res)
    })
  }

}
