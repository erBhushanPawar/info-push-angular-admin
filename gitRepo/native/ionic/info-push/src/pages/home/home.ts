import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

import * as conf from "./../../assets/onesignal.conf";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
    private oneSignal: OneSignal) {
      this.initOneSignal()
  }


  async initOneSignal(userInfo?) {
    // alert("Initiaing one signal" + JSON.stringify(userInfo))
    this.oneSignal.startInit(conf.apiKey, conf.appId)
    this.oneSignal.getIds().then((ids) => {
      //alert("Registered with OneSignal")
      
    }).catch((err) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", err)
      //alert("Failed to send ")
      //alert(err)
      
    })
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)
    this.oneSignal.enableVibrate(true)
    this.oneSignal.handleNotificationReceived().subscribe((notif) => {
      //console.log("New notif received ", notif)
      if (notif.isAppInFocus) {
        //notif.android_sound = 
         alert(JSON.stringify(notif.payload.additionalData))
      }

    })
    this.oneSignal.promptLocation()

    this.oneSignal.sendTags({
      userType: "customer",
      appName: "pe-customer-app",
      appVersion: "0.0.1",
      interests: ["order-updates", "offers", "deals", "shops"]
    })
    this.oneSignal.handleNotificationOpened().subscribe((notif) => {
      console.log(notif, "Opened")
    })


    this.oneSignal.endInit()

  }
}
