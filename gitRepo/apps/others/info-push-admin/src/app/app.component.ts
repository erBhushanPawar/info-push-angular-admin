import { MENU_ITEMS } from './com/naigles/info-push/models/menu-items';
import { NbMenuItem } from '@nebular/theme';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  menu : NbMenuItem[];


  constructor(){
    this.menu = MENU_ITEMS
  }
}
