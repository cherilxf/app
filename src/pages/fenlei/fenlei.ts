import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';

declare let Swiper:any;


/**
 * Generated class for the FenleiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fenlei',
  templateUrl: 'fenlei.html',
})
export class FenleiPage {
  @ViewChild(Slides) slides: Slides;
  fenleiSwiper: any;

  public fenleiNav = '动作片';
  public navActiveCss = '0';

  public arr = [
    {"index": "0", "navName": "动作片"},
    {"index": "1", "navName": "喜剧片"},
    {"index": "2", "navName": "科幻片"},
    {"index": "3", "navName": "恐怖片"},
    {"index": "4", "navName": "爱情片"},
    {"index": "5", "navName": "动画片"},
    {"index": "6", "navName": "战争片"},
    {"index": "7", "navName": "记录片"},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initSwiper();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FenleiPage');
  }

  ionViewDidLeave(){

  }


  initSwiper() {
    this.fenleiSwiper = new Swiper('.fenlei-tabs .swiper-container', {
      spaceBetween: 0,
    });
  }

  selectNavItem(index,event) {
    this.slides.slideTo(index);
    this.navActiveCss = index.toString();
  }


  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    // this.setStyle(index);
    this.slides.lockSwipes(true);
    this.slides.slideTo(currentIndex, 300);
    // console.log(index);
    this.slides.lockSwipes(false);
    for (let i = 0; i < this.arr.length; i++) {
      if(this.arr[i].index === currentIndex.toString()){
        this.navActiveCss = currentIndex.toString();
        this.fenleiNav = this.arr[i].navName;
        // console.log(this.fenleiNav);
        return;
      }
    }
  }

}
