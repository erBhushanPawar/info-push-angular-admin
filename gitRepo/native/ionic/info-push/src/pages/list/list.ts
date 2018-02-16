import { SnypePage } from './../snype/snype';
import { BaseProvider } from './../../providers/base/base';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<any>;
  
  constructor(public navCtrl: NavController, private baseProvider:BaseProvider, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.baseProvider.getSnypse().subscribe((res:any)=>{
      this.items = [];
      this.items = res.result
    })
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    //alert(JSON.stringify(navParams))
    /* for (let i = 1; i < 11; i++) {
      this.items.push({
        title: `Item ${i} - ${navParams["data"]}`,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    } */
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SnypePage, {
      item: item
    });
  }
}
