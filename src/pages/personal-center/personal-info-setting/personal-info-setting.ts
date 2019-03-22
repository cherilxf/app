import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {AlertController} from 'ionic-angular';

import {PersonalCenterService} from "../personal-center.service";

/**
 * Generated class for the PersonalInfoSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'nameSetting.html',
  providers: [PersonalCenterService]
})
export class NameSettingPage {
  public accound: String = "";
  public user_nickname: String = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private personalCenterService: PersonalCenterService) {

    this.accound = this.navParams.get("accound");
    this.user_nickname = this.navParams.get("user_nickname");
  }

  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
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

  saveName(username: HTMLInputElement) {
    this.personalCenterService.editUserNickName_service(this.accound, username.value).subscribe(data => {
      let editState = data.edit_state;
      let user_data = data.user_data;
      if (editState === true) {
        this.storage.set('user_data', user_data);
        this.showAlert("保存成功！");
      } else {
        this.showAlert("服务器出错！");
      }
    }, error => {
      alert(error);
    });
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {
          this.navCtrl.pop();
        }
      }],
    });
    alert.present();
  }
}

@Component({
  templateUrl: 'sexSetting.html',
  providers: [PersonalCenterService]
})
export class SexSettingPage {
  public accound: String = "";
  public user_sex: String = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private personalCenterService: PersonalCenterService) {

    this.accound = this.navParams.get("accound");
    this.user_sex = this.navParams.get("user_sex");
  }

  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
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

  saveSex() {
    let sex = this.user_sex === "男" ? 0 : 1;
    this.personalCenterService.editUserSex_service(this.accound, sex).subscribe(data => {
      let editState = data.edit_state;
      let user_data = data.user_data;
      if (editState === true) {
        this.storage.set('user_data', user_data);
        this.showAlert("保存成功！");
      } else {
        this.showAlert("服务器出错！");
      }
    }, error => {
      alert(error);
    });
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {
          this.navCtrl.pop();
        }
      }],
    });
    alert.present();
  }
}

@Component({
  templateUrl: 'descriptionSetting.html',
  providers: [PersonalCenterService]
})
export class DescriptionSettingPage {
  public accound: String = "";
  public user_description: String = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private personalCenterService: PersonalCenterService) {

    this.accound = this.navParams.get("accound");
    this.user_description = this.navParams.get("user_description");
  }

  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }
  ionViewDidEnter() {}
  ionVieWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }
  ionViewDidLeave() {}

  saveDescription(description: HTMLInputElement) {
    this.personalCenterService.editUserDescription_service(this.accound, description.value).subscribe(data => {
      let editState = data.edit_state;
      let user_data = data.user_data;
      if (editState === true) {
        this.storage.set('user_data', user_data);
        this.showAlert("保存成功！");
      } else {
        this.showAlert("服务器出错！");
      }
    }, error => {
      alert(error);
    });
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {
          this.navCtrl.pop();
        }
      }],
    });
    alert.present();
  }
}

@Component({
  selector: 'page-personal-info-setting',
  templateUrl: 'personal-info-setting.html',
  providers: [PersonalCenterService]
})
export class PersonalInfoSettingPage {
  public accound : String = "";
  public user_data: any = {
    accound: "",
    user_head_sculpture: "",
    user_nickname: "",
    user_sex: "",
    user_birthday: "",
    user_description: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    private personalCenterService: PersonalCenterService) {

    this.accound = this.navParams.get("accound");
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PersonalInfoSettingPage');
  }

  ionViewWillEnter() {
    this.storage.get("user_data").then((data) => {
      this.user_data = {
        accound: data.accound,
        user_head_sculpture: data.head_sculpture,
        user_nickname: data.nickname,
        user_sex: data.sex === 0 ? "男" : "女",
        user_birthday: data.birthday || "1990-02-19",
        user_description: data.description
      };
    });

    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
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

  nameSetting() {
    this.navCtrl.push(NameSettingPage, {
      accound: this.user_data.accound,
      user_nickname: this.user_data.nickname
    });
  }
  sexSetting() {
    this.navCtrl.push(SexSettingPage, {
      accound: this.user_data.accound,
      user_sex: this.user_data.user_sex
    });
  }
  saveBirthday(){
    this.personalCenterService.editUserBirthday_service(this.accound, this.user_data.user_birthday).subscribe(data => {
      let editState = data.edit_state;
      let user_data = data.user_data;
      if (editState === true) {
        this.storage.set('user_data', user_data);
      } else {
        this.showAlert("服务器出错！");
      }
    }, error => {
      this.showAlert(error);
    });
  }
  descriptionSetting() {
    this.navCtrl.push(DescriptionSettingPage, {
      accound: this.user_data.accound,
      user_description: this.user_data.user_description
    });
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
