import { BaseService } from './../../services/base.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
/* var cloudinary_npm = require('cloudinary') */
@Component({
  selector: 'app-create-snypse',
  templateUrl: './create-snypse.component.html',
  styleUrls: ['./create-snypse.component.css']
})
export class CreateSnypseComponent implements OnInit, OnChanges {
  @Input("existingSnype") existingSnype: any;
  snypse = {
    snypseId: Math.random().toString(20),
    title: "Sample Snypse",
    description: "Sample desc",
    catId: "",
    notify: true,
    img: "http://res.cloudinary.com/brainethic/image/upload/c_scale,w_120/v1517114459/Telecom_Directory_Nagpur_Division_kj5ego.jpg"
  }
  cats = []
  constructor(private baseService: BaseService, private cloudinary: Cloudinary) { }
  ngOnChanges() {
    this.snypse = this.existingSnype || {}
  }
  ngOnInit() {
    this.getCatList()
    console.log(this.cloudinary.cloudinaryInstance.image('download_1_bmejdb'));

  }

  getCatList() {

    this.baseService.getCat().subscribe((res: any) => {
      if (res.result) {
        this.cats = res.result
        console.log(this.cats)
      }
    })
  }
  saveSnypse() {
    if (!this.snypse.catId.length) {
      alert("Please select any category id for this")
      return
    }
    this.baseService.saveSnypse(this.snypse).subscribe((res: any) => {
      if (res.result && res.result.isSaved) {
        alert("Saved snypse")
      }
      console.log(res)
    })
  }


}
