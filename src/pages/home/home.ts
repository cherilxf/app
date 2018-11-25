import { Component,ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild( Slides ) slides: Slides;
  constructor(public navCtrl: NavController) {  // 实例化

  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    // 解决轮播手动滑动后不能自动轮播问题
    this.slides.autoplayDisableOnInteraction = false;
  }

  /*  goToHomePage() {
    // go to the MyPage component
    this.navCtrl.push('HomePage');
  }*/


}

