import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';

import {CommentDetailPage} from "../comment-detail/comment-detail";
import {CinemaPage} from "../cinema/cinema";


declare let Swiper: any;
declare let $;

/**
 * Generated class for the MovieDetailPage page.
 //  *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {
  @ViewChild(Slides) slides: Slides;
  movieDetailSwiper: any;

  public movieDetailTab = '影片简介';
  public tabActive = '0';
  public tabArr = [
    {"index": "0", "tabName": "影片简介"},
    {"index": "1", "tabName": "影评"},
    {"index": "2", "tabName": "讨论区"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initSwiper();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetailPage');
  }

  initSwiper() {
    this.movieDetailSwiper = new Swiper('.movieDetail-actor .swiper-container', {
      spaceBetween: 0,
    });
  }

  wantWatch(){
    let iconName = $('.watch-btn .wantWatch ion-icon').attr('name');
    if(iconName == 'xiangkan'){
      $('.watch-btn .wantWatch').css({
        'color': '#FFA146',
        'background-color': '#FFF7C2'
      });
      $('.watch-btn .wantWatch ion-icon').attr('name','xiangkan-outline').removeClass('ion-md-xiangkan').addClass('ion-md-xiangkan-outline');
    }else if(iconName == 'xiangkan-outline'){
      $('.watch-btn .wantWatch').css({
        'color': '#000',
        'background-color': '#f8f8f8'
      });
      $('.watch-btn .wantWatch ion-icon').attr('name','xiangkan').removeClass('ion-md-xiangkan-outline').addClass('ion-md-xiangkan');
    }
  }

  scrollContentEvent(event) {
    if (event.scrollTop >= 380.8) {
      this.navFixed();
    } else {
      this.navUnFixed();
    }
  }

  navFixed(){
    $('.movieDetail-bottom .movieDetail-tabs').css({
      position: 'fixed',
      top: 48,
      left: 0,
      z_index: 9999
    });
    $('.movieDetail-tabsContent ion-slides ion-slide').css({
      'padding-top': '40px',
    });
  }

  navUnFixed(){
    $('.movieDetail-bottom .movieDetail-tabs').css({
      position: 'static',
    });
    $('.movieDetail-tabsContent ion-slides ion-slide').css({
      'padding-top': 0
    });
  }

  segmentChanged(event) {
    let tabName = event.value;
    let index;
    for (let i = 0; i < this.tabArr.length; i++) {
      if (this.tabArr[i].tabName == tabName) {
        index = i;
        break;
      }
    }
    this.slides.slideTo(index);
    this.tabActive = index.toString();
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    // this.setStyle(index);
    this.slides.slideTo(currentIndex, 300);
    // console.log(index);
    for (let i = 0; i < this.tabArr.length; i++) {
      if (this.tabArr[i].index === currentIndex.toString()) {
        this.tabActive = currentIndex.toString();
        this.movieDetailTab = this.tabArr[i].tabName;
        // console.log(this.fenleiNav);
        return;
      }
    }
  }

  dianzanDo(index){
    let dianzanBtn = $('.dianzan').eq(index-1);
    let iconName = dianzanBtn.attr('name');
    if(iconName == 'dianzan'){
      dianzanBtn.css({
        'color': '#d81e06',
      });
      dianzanBtn.attr('name','dianzan-outline').removeClass('ion-md-dianzan').addClass('ion-md-dianzan-outline');
    }else if(iconName == 'dianzan-outline'){
      dianzanBtn.css({
        'color': '#000'
      });
      dianzanBtn.attr('name','dianzan').removeClass('ion-md-dianzan-outline').addClass('ion-md-dianzan');
    }
  }
  goCommentPage(index) {
    this.navCtrl.push(CommentDetailPage,{
      id: 10001
    });
    // this.navCtrl.pop();
  }

  goCinemaPage(){
    this.navCtrl.push(CinemaPage,{
      id: 10001
    });
  }

}