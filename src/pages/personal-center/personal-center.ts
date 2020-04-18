<<<<<<< HEAD
import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

import {PersonalInfoSettingPage} from "./personal-info-setting/personal-info-setting";
import {SettingPage} from "./setting/setting";
import {MovieTicketPage} from "./movie-ticket/movie-ticket";
import {WishMoviePage} from "./wish-movie/wish-movie";
import {HaveSeenMoviePage} from "./have-seen-movie/have-seen-movie";
import {GoLoginPage} from "../go-login/go-login";

import {PersonalCenterService} from "./personal-center.service";

=======
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
>>>>>>> first commit

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
<<<<<<< HEAD
  providers: [PersonalCenterService]
})
export class PersonalCenterPage {
  public has_login: boolean;

  public user_data : any = {
    accound: "",
    user_nickname: "",
    user_head_sculpture: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private personalCenterService: PersonalCenterService) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: '加载数据中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();

    setTimeout(()=>{
      loading.dismiss().then(()=>{

      });//显示多久消失
    },300);
  }

  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }

    this.storage.get("has_login").then((result) => {
      this.has_login = result;
    });
    this.storage.get("user_data").then((data) => {
      this.user_data.accound = data.accound;
      this.user_data.user_nickname = data.nickname;
      this.user_data.user_head_sculpture = data.head_sculpture;
    });
  }
  ionViewDidEnter() {}
  ionViewWillLeave() {}
  ionViewDidLeave() {}

  goSetting() {
    if (this.has_login) {
      this.navCtrl.push(SettingPage, {
        accound: this.user_data.accound
      });
    } else {
      this.goLogin();
    }
  }

  goInfoSetting() {
    if (this.has_login) {
      this.navCtrl.push(PersonalInfoSettingPage, {
        accound: this.user_data.accound
      });
    } else {
      this.goLogin();
    }
  }

  goMyTicketPage() {
    if (this.has_login) {
      this.navCtrl.push(MovieTicketPage, {});
    } else {
      this.goLogin();
    }
  }

  goWishMoviePage() {
    if (this.has_login) {
      this.navCtrl.push(WishMoviePage, {});
    } else {
      this.goLogin();
    }
  }

  goHaveSeenMoviePage() {
    if (this.has_login) {
      this.navCtrl.push(HaveSeenMoviePage, {});
    } else {
      this.goLogin();
    }
  }

  goLogin() {
    this.navCtrl.push(GoLoginPage, {})
  }
=======
})
export class PersonalCenterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalCenterPage');
  }

>>>>>>> first commit
}
