import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {Storage} from "@ionic/storage";

import {PersonalCenterPage} from "../../personal-center/personal-center";

import {LoginService} from "./login.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginService,
    private storage: Storage,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {}

  ionViewWillEnter(){
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }
  ionViewDidEnter(){}
  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }
  ionViewDidLeave() {}

  goBack(){
    this.navCtrl.push(PersonalCenterPage,{

    });
  }

  logIn(accound: HTMLInputElement, password: HTMLInputElement) {
    let loginData = {
      accound: accound.value,
      password: password.value
    };

    if (loginData.accound.length == 0) {
      this.showAlert('请输入账号');
    } else if (loginData.password.length == 0) {
      this.showAlert('请输入密码');
    } else {
      this.loginService.login_service(loginData).subscribe(data => {
        let loginState = data.state;
        let user_data = data.user_data;
        if (loginState === null) {
          this.storage.set('has_login', false);
          this.showAlert('账号错误');
        } else if (loginState === false) {
          this.storage.set('has_login', false);
          this.showAlert('密码错误');
        } else if (loginState === true) {
          this.storage.set('has_login', true);
          this.storage.set('user_data', user_data);
          this.navCtrl.push(PersonalCenterPage,{
          });
          // this.navCtrl.popToRoot();
        } else {
          this.showAlert('服务器出错啦！');
        }
      }, error => {
        this.showAlert('服务器出错啦！');
      });
    }
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: ['确定']
    });
    alert.present();
  }
}
