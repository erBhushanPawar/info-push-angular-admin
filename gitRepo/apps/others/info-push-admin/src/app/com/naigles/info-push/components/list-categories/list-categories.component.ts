import { BaseService } from './../../services/base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  private cat = {}
  ngOnInit() {
  }
  rows = [];
  editToggle(one, ind) {
    let query = {}

    if (one == false) {
      //needs to save now
      query["catId"] = this.cat["catId"]
      console.log(this.cat)
      this.cat["isEdit"] = false
      this.baseService.updateCat(query, this.cat).subscribe((res: any) => {
        alert(JSON.stringify(res))
        this.rows[ind] = this.cat
      })
    } else {
      this.cat = one
      one.isEdit = true

    }
  }
  toggle(one, ind) {
    let query = {}
    query["catId"] = one.catId
    /* if (one.isActive == undefined) {
      one.isActive = false
    }
    else */ {
      one.isActive = !one.isActive
    }
    this.baseService.updateSnypse(query, one).subscribe((res: any) => {
      alert(JSON.stringify(res))
      this.rows[ind] = one
    })
  }
  constructor(private baseService: BaseService) {

    this.baseService.getCat().subscribe((res: any) => {
      this.rows = res.result
    })
  }

  fetch(cb) {

  }

  selected = [];
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }



}
