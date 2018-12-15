import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';


/**
 * Generated class for the MoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})
export class MoviePage {
  @ViewChild(Slides) slides: Slides;

  public MovieTabs = '电影';
  public MovieListTabs = '正在热映';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    let reying = this.navParams.get('reying');
    let comesoon = this.navParams.get('comesoon');
    if(reying){
      this.MovieListTabs = '正在热映';
    }else if(comesoon){
      this.MovieListTabs = '即将上映';
    }
  }


  movieContentList(){
    this.MovieListTabs = '正在热映';
  }

  MovieTabsChanged() {

  }
  MovieListTabsChanged(){
    if(this.MovieListTabs == '正在热映'){
      this.slides.slideTo(0, 300);
    }else if(this.MovieListTabs == '即将上映'){
      this.slides.slideTo(1, 300);
    }
  }
  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex == 0){
      this.MovieListTabs = '正在热映';
    }else if(currentIndex == 1){
      this.MovieListTabs = '即将上映';
    }
  }

  /*上拉更新*/
  doInfinite(infiniteScroll){  /*接收事件对象传值*/
    console.log('11111');
  }
}
