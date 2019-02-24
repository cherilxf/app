import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MovieService} from "./movie.service";

declare let $: any;

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

  public MovieTabs = '电影';

  public movie_reying_data: any;
  public loadMore = {
    startReying: 0,
    startComesoon: 0,
    count: 6,
    loadingText: '正在加载更多...'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieService: MovieService) {
    this.loadMore.startReying = 0;
    this.getReyingMovie();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MoviePage');
  }

  MovieTabsChanged() {

  }

  getReyingMovie() {
    this.movieService.getReyingMovieData(this.loadMore.startReying, this.loadMore.count).subscribe(data => {
      this.movie_reying_data = data.data;
      this.loadMore.startReying = this.loadMore.count;
    }, error => {
      alert(error);
    });
  }

  loadMoreReyingMovie(infiniteScroll) {
    setTimeout(() => {
      this.movieService.getReyingMovieData(this.loadMore.startReying, this.loadMore.count).subscribe(data => {
        let newData = data.data;
        console.log(newData)
        this.movie_reying_data = this.movie_reying_data.concat(newData);
        this.loadMore.startReying += this.loadMore.count;
        infiniteScroll.complete();
        if (newData.length < this.loadMore.count) {
          infiniteScroll.enable(false);
          // this.loadMore.loadingText = '亲，我是有底线的';
        }
      }, error => {
        alert(error);
      });
    }, 1000);
  }

  scrollDo(){
    console.log(111)
  }
}
