import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SnypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-snype',
  templateUrl: 'snype.html',
})
export class SnypePage {
  public snype: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.snype = navParams.data["item"]
    if (this.snype.img) {

      this.snype.img = this.snype.img.replace("c_scale,w_50", "c_scale,w_250")
    }
    console.log(this.snype)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SnypePage');
  }

}
