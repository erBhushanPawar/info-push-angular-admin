import { BaseService } from './../../services/base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-snypse',
  templateUrl: './list-snypse.component.html',
  styleUrls: ['./list-snypse.component.css']
})
export class ListSnypseComponent implements OnInit {
  private snypse: any = {};

  ngOnInit() {
    this.getCatList()

  }
  rows = [];
  cats = []

  getCatList() {

    this.baseService.getCat().subscribe((res: any) => {
      if (res.result) {
        this.cats = res.result
        console.log(this.cats)
      }
    })
  }
  editToggle(one, ind) {
    let query = {}

    if (one == false) {
      //needs to save now
      query["_id"] = this.snypse["_id"]
      console.log(this.snypse)
      this.snypse["isEdit"] = false
      this.baseService.updateSnypse(query, this.snypse).subscribe((res: any) => {
        alert(JSON.stringify(res))
        this.rows[ind] = this.snypse
      })
    } else {
      this.snypse = one
      one.isEdit = true

    }
  }
  toggle(one, ind) {
    let query = {}
    query["_id"] = one._id
    one.isActive = !one.isActive
    this.baseService.updateSnypse(query, one).subscribe((res: any) => {
      alert(JSON.stringify(res))
      this.rows[ind] = one
    })
  }

  constructor(private baseService: BaseService) {

    this.baseService.getSnypse().subscribe((res: any) => {
      this.rows = res.result
    })
  }

}
