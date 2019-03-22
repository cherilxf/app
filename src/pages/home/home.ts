import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, IonicPage, Slides} from 'ionic-angular';

import {MovieDetailPage} from "../movie-detail/movie-detail";
import {ReyingPage} from "../reying/reying";
import {ComesoonPage} from "../comesoon/comesoon";

import {HomeService} from './home.service';

declare let Swiper: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  homeSwiper: any;

  public home_reying_movie: any;

  public home_comesoon_movie: any;

  public banner_imgs: any = [];

  constructor(public navCtrl: NavController, private homeService: HomeService) {  // 实例化
    this.getBannerImgs();
    this.getReyingMovie();
    this.getComesoonMovie();
    this.initSwiper();
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
    // 解决轮播手动滑动后不能自动轮播问题
    this.slides.autoplayDisableOnInteraction = false;
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();
  }

  ionViewDidLeave() {
    this.slides.stopAutoplay();
  }

  initSwiper() {
    this.homeSwiper = new Swiper('.home-reying-content .swiper-container', {
      spaceBetween: 0,
    });
  }

  getBannerImgs(){
    this.homeService.getBannerImgsData_service().subscribe(data => {
      // console.log(data.data);
      this.banner_imgs = data.data;
    }, error => {
      alert(error);
    });
  }
  getReyingMovie() {
    this.homeService.getReyingMovieData_service().subscribe(data => {
      this.home_reying_movie = data.data;
    }, error => {
      alert(error);
    });
  }
  getComesoonMovie() {
    this.homeService.getComesoonMovieData_service().subscribe(data => {
      this.home_comesoon_movie = data.data;
    }, error => {
      alert(error);
    });
  }

  goMovieDetailPage(movie) {
    // console.log(item.id);
    this.navCtrl.push(MovieDetailPage, {
      movieId: movie.id
    });
  }

  goReyingMorePage() {
    this.navCtrl.push(ReyingPage, {})
  }
  goComesoonMorePage() {
    this.navCtrl.push(ComesoonPage, {})
  }
}

