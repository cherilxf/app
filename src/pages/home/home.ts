<<<<<<< HEAD
import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, IonicPage, Slides, AlertController, LoadingController} from 'ionic-angular';

import {MovieDetailPage} from "../movie-detail/movie-detail";
import {ReyingPage} from "../reying/reying";
import {ComesoonPage} from "../comesoon/comesoon";

import {HomeService} from './home.service';

declare let Swiper: any;
=======
import { Component,ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Slides } from 'ionic-angular';

>>>>>>> first commit

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
<<<<<<< HEAD
  @ViewChild("banner_slides") banner_slides: Slides;

  public loading: boolean = false;

  public banner_imgs: any = [];
  public home_reying_movie: any;
  public home_comesoon_movie: any;

  constructor(
    public navCtrl: NavController,
    private homeService: HomeService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {  // 实例化

  }

  ionViewDidLoad() {
    this.loading = false;
    this.getHomeData();
  }
  ionViewWillEnter() {}
  ionViewDidEnter() {
    if(this.banner_imgs.length > 1){
      this.banner_slides.startAutoplay();
      this.banner_slides.autoplayDisableOnInteraction = false;
    }
  }
  ionViewDidLeave() {
    if(this.banner_imgs.length>1){
      this.banner_slides.stopAutoplay();
    }
  }

  getHomeData(){
    let loading = this.loadingCtrl.create({
      content: '加载中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();

    setTimeout(()=>{
      loading.dismiss().then(()=>{
        this.getBannerImgs();
        this.getReyingMovie();
        this.getComesoonMovie();
        this.loading = true;
      });
    },1000);
  }

  getBannerImgs(){
    this.homeService.getBannerImgsData_service().subscribe(data => {
      // console.log(data.data);
      this.banner_imgs = data.data;
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }
  getReyingMovie() {
    this.homeService.getReyingMovieData_service().subscribe(data => {
      this.home_reying_movie = data.data;
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }
  getComesoonMovie() {
    this.homeService.getComesoonMovieData_service().subscribe(data => {
      this.home_comesoon_movie = data.data;
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  goMovieDetailPage(movieId) {
    this.navCtrl.push(MovieDetailPage, {
      movieId: movieId
    });
  }

  goReyingMorePage() {
    this.navCtrl.push(ReyingPage, {})
  }
  goComesoonMorePage() {
    this.navCtrl.push(ComesoonPage, {})
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
=======
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


>>>>>>> first commit
}

