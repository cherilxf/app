import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";

import {PersonalInfoSettingPage} from "../personal-info-setting/personal-info-setting";
import {LoginPage} from "../../go-login/login/login";


/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  public accound: String = "";
  public user_data: any = {
    accound: "",
    user_head_sculpture: "",
    user_nickname: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController) {

    this.accound = this.navParams.get("accound");
  }

  ionViewDidLoad() {}
  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }

    this.storage.get("user_data").then((data) => {
      this.user_data = {
        accound: data.accound,
        user_head_sculpture: data.head_sculpture,
        user_nickname: data.nickname
      };
    });
  }
  ionViewDidEnter() {}
  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }
  ionViewDidLeave() {}

  goInfoSetting() {
    this.navCtrl.push(PersonalInfoSettingPage, {
      accound: this.user_data.accound
    });
  }

  logout() {
    this.resetData();
    this.navCtrl.push(LoginPage,{});
  }

  resetData(){
    this.storage.set('has_login', false);
    this.storage.set('user_data', {
      accound: "",
      head_sculpture: "assets/imgs/MEAN.jpg",
      nickname: "未登录",
      sex: "男",
      birthday: "1990-02-19",
      description: "依旧纯洁的你..."
    });
  }

  clearCache(){
    this.showAlert("缓存清理成功！");
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {

        }
      }],
    });
    alert.present();
  }
}
