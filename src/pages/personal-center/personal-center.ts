import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

import {PersonalInfoSettingPage} from "./personal-info-setting/personal-info-setting";
import {SettingPage} from "./setting/setting";
import {MovieTicketPage} from "./movie-ticket/movie-ticket";
import {WishMoviePage} from "./wish-movie/wish-movie";
import {HaveSeenMoviePage} from "./have-seen-movie/have-seen-movie";
import {GoLoginPage} from "../go-login/go-login";

import {PersonalCenterService} from "./personal-center.service";


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
    private personalCenterService: PersonalCenterService) {
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
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
}
