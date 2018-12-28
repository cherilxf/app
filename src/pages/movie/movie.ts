import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {MovieService} from "./movie.service";
import {HomeService} from "../home/home.service";


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
  providers: [MovieService]
})
export class MoviePage {
  @ViewChild(Slides) slides: Slides;

  public MovieTabs = '电影';
  public MovieListTabs = '正在热映';

  movie_reying_movie: any;
  movie_comesoon_movie: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieService: MovieService) {
    this.getReyingMovie();
    this.getComesoonMovie();
  }

  ionViewDidLoad() {
    let reying = this.navParams.get('reying');
    let comesoon = this.navParams.get('comesoon');
    if (reying) {
      this.MovieListTabs = '正在热映';
    } else if (comesoon) {
      this.MovieListTabs = '即将上映';
    }
  }

  getReyingMovie() {
    this.movieService.getReyingMovieData().subscribe(data => {
      this.movie_reying_movie = data.data;
    }, error => {
      alert(error);
    });
  }

  getComesoonMovie() {
    this.movieService.getComesoonMovieData().subscribe(data => {
      this.movie_comesoon_movie = data.data;
    }, error => {
      alert(error);
    });
  }

  /*上拉更新*/
  doInfinite(infiniteScroll) {  /*接收事件对象传值*/
    console.log('11111');
  }

  movieContentList() {
    this.MovieListTabs = '正在热映';
  }

  MovieTabsChanged() {

  }

  MovieListTabsChanged() {
    if (this.MovieListTabs == '正在热映') {
      this.slides.slideTo(0, 300);
    } else if (this.MovieListTabs == '即将上映') {
      this.slides.slideTo(1, 300);
    }
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if (currentIndex == 0) {
      this.MovieListTabs = '正在热映';
    } else if (currentIndex == 1) {
      this.MovieListTabs = '即将上映';
    }
  }
}
