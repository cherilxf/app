/* 根组件 */
import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from "@ionic/storage";

import {TabsPage} from '../pages/tabs/tabs';
import {WelcomePage} from "../pages/welcome/welcome";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.storage.get('first_in').then((result) => {
      console.log('first_in', result);
      // result = false;
      if (result) {
        this.storage.set('first_in', false);
        this.storage.set('has_login', false);
        this.resetUserData();
        this.rootPage = WelcomePage;
      } else {
        let that = this;
        this.storage.get("has_login").then((result) => {
          if (!result) {
            that.resetUserData();
          }
        });
        this.rootPage = TabsPage;
      }
    });
  }

  resetHasLogin() {
    this.storage.set('has_login', false);
  }

  resetUserData() {
    this.storage.set('user_data', {
      accound: "",
      head_sculpture: "assets/imgs/MEAN.jpg",
      nickname: "未登录",
      sex: "男",
      birthday: "1990-02-19",
      description: "依旧纯洁的你..."
    });
  }
}
