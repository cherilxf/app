import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PersonalInfoSettingPage } from "./personal-info-setting/personal-info-setting";
import { SettingPage } from "./setting/setting";
import {MovieTicketPage} from "./movie-ticket/movie-ticket";
import {WishMoviePage} from "./wish-movie/wish-movie";
import {HaveSeenMoviePage} from "./have-seen-movie/have-seen-movie";


/**
 * Generated class for the PersonalCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-center',
  templateUrl: 'personal-center.html',
})
export class PersonalCenterPage {

  year: any;
  month: any;
  day: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalCenterPage');
  }

  goSetting(){
    this.navCtrl.push(SettingPage,{

    })
  }

  goInfoSetting(){
    this.navCtrl.push(PersonalInfoSettingPage,{

    })
  }

  goMyTicketPage(){
    this.navCtrl.push(MovieTicketPage,{

    })
  }

  goWishMoviePage(){
    this.navCtrl.push(WishMoviePage,{

    })
  }

  goHaveSeenMoviePage(){
    this.navCtrl.push(HaveSeenMoviePage,{

    })
  }
}
