import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, IonicPage, Slides} from 'ionic-angular';

import {MovieDetailPage} from "../movie-detail/movie-detail";

import {HomeService} from './home.service';

declare let Swiper: any;

@IonicPage()
@Component({
  templateUrl: 'reying.html',
})
export class ReyingPage {
  constructor(params: NavParams) {

  }
}
@Component({
  templateUrl: 'comesoon.html',
})
export class ComesoonPage {
  constructor(params: NavParams) {

  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  homeSwiper: any;

  public arr = [
    {"src": "assets/imgs/MEAN.jpg"},
    {"src": "assets/imgs/MEAN.jpg"},
    {"src": "assets/imgs/MEAN.jpg"},
    {"src": "assets/imgs/MEAN.jpg"},
    {"src": "assets/imgs/MEAN.jpg"},
    {"src": "assets/imgs/MEAN.jpg"},
  ];

  constructor(public navCtrl: NavController, private HomeService: HomeService) {  // 实例化
    console.log(this.HomeService.getData());
    this.initSwiper();
  }

  ionViewWillEnter() {
  }

  initSwiper() {
    this.homeSwiper = new Swiper('.home-reying-content .swiper-container', {
      spaceBetween: 0,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
    // 解决轮播手动滑动后不能自动轮播问题
    this.slides.autoplayDisableOnInteraction = false;
  }

  ionViewDidLeave() {
    this.slides.stopAutoplay();
  }

  goMovieDetailPage() {
    this.navCtrl.push(MovieDetailPage, {
      movieID: "123456"
    });
  }

  goReyingMorePage() {
    this.navCtrl.push(ReyingPage, {})
  }

  goComesoonMorePage() {
    this.navCtrl.push(ComesoonPage, {})
  }
}

