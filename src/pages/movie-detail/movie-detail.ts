import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, Loading, NavController, NavParams, Slides} from 'ionic-angular';

import {CommentDetailPage} from "../comment-detail/comment-detail";
import {CinemaPage} from "../cinema/cinema";
import {MovieDetailService} from "./movie-detail.service";

declare let $: any;

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
  providers: [MovieDetailService]
})
export class MovieDetailPage {
  @ViewChild(Slides) slides: Slides;

  public loadFinish: boolean = false;
  public buyBtn_Show: boolean = false;
  public movie_id : String;
  public movieDetailData: any;
  public commentData: any = [];

  public movieDetailTab = '影片简介';
  public tabArr: any[] = [
    {"index": "0", "tabName": "影片简介"},
    {"index": "1", "tabName": "影评"},
    {"index": "2", "tabName": "讨论区"}
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieDetailService: MovieDetailService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.movie_id = this.navParams.get('movieId');
  }

  ionViewDidLoad() {
    this.loadFinish = false;
    this.buyBtn_Show = false;

    this.getMovieDetailData();
    this.getCommentlData();
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

  goCommentPage(item) {
    this.navCtrl.push(CommentDetailPage, {
      "comment_data": item
    });
  }
  goCinemaPage() {
    this.navCtrl.push(CinemaPage, {
      movieId: this.movie_id
    });
  }

  getMovieDetailData() {
    let loading = this.loadingCtrl.create({
      content: '加载数据中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();

    this.movieDetailService.getMovieDetailData_service(this.movie_id).subscribe(data => {
      if (data.state) {
        if(data.data !== null){
          setTimeout(()=>{
            loading.dismiss().then(()=>{
              this.movieDetailData = data.data;
              this.loadFinish = true;
              this.buyBtn_Show = true;
            });//显示多久消失
          },1000);
        }else {
          setTimeout(()=>{
            loading.dismiss().then(()=>{
              this.showAlert("亲，找不到数据！");
            });//显示多久消失
          },1000);
        }
      } else {
        setTimeout(()=>{
          loading.dismiss().then(()=>{
            this.showAlert("获取数据失败！");
          });//显示多久消失
        },1000);
      }
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  getCommentlData() {
    this.movieDetailService.getCommentData_service(this.movie_id).subscribe(data => {
      if(data.state){
        this.commentData = data.data;
      }else{
        this.commentData = []  ;
      }
    }, error => {
      this.showAlert('服务器出错啦！');
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

  wantWatch() {
    let iconName = $('.watch-btn .wantWatch ion-icon').attr('name');
    if (iconName == 'xiangkan') {
      $('.watch-btn .wantWatch').css({
        'color': '#FFA146',
        'background-color': '#FFF7C2'
      });
      $('.watch-btn .wantWatch ion-icon').attr('name', 'xiangkan-outline').removeClass('ion-md-xiangkan').addClass('ion-md-xiangkan-outline');
    } else if (iconName == 'xiangkan-outline') {
      $('.watch-btn .wantWatch').css({
        'color': '#000',
        'background-color': '#f8f8f8'
      });
      $('.watch-btn .wantWatch ion-icon').attr('name', 'xiangkan').removeClass('ion-md-xiangkan-outline').addClass('ion-md-xiangkan');
    }
  }
  haveSeen() {
    let iconName = $('.watch-btn .haveSeen ion-icon').attr('name');
    if (iconName == 'xiangkan') {
      $('.watch-btn .haveSeen').css({
        'color': '#FFA146',
        'background-color': '#FFF7C2'
      });
      $('.watch-btn .haveSeen ion-icon').attr('name', 'xiangkan-outline').removeClass('ion-md-xiangkan').addClass('ion-md-xiangkan-outline');
    } else if (iconName == 'xiangkan-outline') {
      $('.watch-btn .haveSeen').css({
        'color': '#000',
        'background-color': '#f8f8f8'
      });
      $('.watch-btn .haveSeen ion-icon').attr('name', 'xiangkan').removeClass('ion-md-xiangkan-outline').addClass('ion-md-xiangkan');
    }
  }

  dianzanDo(index,item) {
    let dianzanBtn = $('.dianzan').eq(index);
    let iconName = dianzanBtn.attr('name');
    if (iconName == 'dianzan') {
      this.commentData[index].useful_count++;

      dianzanBtn.css({
        'color': '#d81e06',
      });
      dianzanBtn.attr('name', 'dianzan-outline').removeClass('ion-md-dianzan').addClass('ion-md-dianzan-outline');
    } else if (iconName == 'dianzan-outline') {
      this.commentData[index].useful_count--;

      dianzanBtn.css({
        'color': '#000'
      });
      dianzanBtn.attr('name', 'dianzan').removeClass('ion-md-dianzan-outline').addClass('ion-md-dianzan');
    }
  }

  scrollContentEvent(event) {
    if (event.scrollTop >= 378) {
      this.navFixed();
    } else {
      this.navUnFixed();
    }
  }
  navFixed() {
    let $tabsEle = $('.movieDetail-bottom-header');
    let tabsHeight = $tabsEle.height();
    $tabsEle.addClass('movieDetail-bottom-tabsFixed');
    $('.movieDetail-bottom-content').css({
      'padding-top': tabsHeight,
    });
    $('.movieDetail-footer').css({
      'visibility': 'hidden'
    })
  }
  navUnFixed() {
    $('.movieDetail-bottom-header').removeClass('movieDetail-bottom-tabsFixed');
    $('.movieDetail-bottom-content').css({
      'padding-top': 0
    });
    $('.movieDetail-footer').css({
      'visibility': 'visible'
    });
  }

  segmentChanged(index) {
    this.slides.slideTo(index, 300);
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    // this.setStyle(index);
    for (let i = 0; i < this.tabArr.length; i++) {
      if (this.tabArr[i].index === currentIndex.toString()) {
        this.movieDetailTab = this.tabArr[i].tabName;
        break;
      }
    }

    this.slides.lockSwipes(true);
    this.slides.slideTo(currentIndex, 300);
    this.slides.lockSwipes(false);
  }
}