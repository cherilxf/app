import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the PersonalInfoSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'nameSetting.html',
})
export class NameSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}

@Component({
  templateUrl: 'sexSetting.html',
})
export class SexSettingPage {
  sex;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  saveSexInfo(){
    console.log(this.sex);
  }
}

@Component({
  templateUrl: 'descriptionSetting.html',
})
export class DescriptionSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  saveDescriptionInfo(){
  }
}

@Component({
  selector: 'page-personal-info-setting',
  templateUrl: 'personal-info-setting.html',
})
export class PersonalInfoSettingPage {
  public birthdayEvent = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoSettingPage');
  }

  nameSetting() {
    this.navCtrl.push(NameSettingPage, {});
  }

  sexSetting() {
    this.navCtrl.push(SexSettingPage, {});
  }

  descriptionSetting() {
    this.navCtrl.push(DescriptionSettingPage, {});
  }
}
