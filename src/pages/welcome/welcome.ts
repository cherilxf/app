import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  slides = [
    {
      title: "Welcome to the Go-Watch App!",
      description: "应用引导页面01",
      image: "assets/imgs/start_01.png",
    },
    {
      title: "Welcome to the Go-Watch App!",
      description: "应用引导页面02",
      image: "assets/imgs/start_02.png",
    },
    {
      title: "Welcome to the Go-Watch App!",
      description: "应用引导页面03",
      image: "assets/imgs/start_03.png",
    },
    {
      title: "Welcome to the Go-Watch App!",
      description: "应用引导页面04",
      image: "assets/imgs/start_04.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goIndexPage(){
    this.navCtrl.push(TabsPage);
  }
}
