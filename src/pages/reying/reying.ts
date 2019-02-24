import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MovieService} from "../movie/movie.service";

/**
 * Generated class for the ReyingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reying',
  templateUrl: 'reying.html',
  providers: [MovieService]
})
export class ReyingPage {
  public movie_reying_data: any;

  public loadMore ={
    start: 0,
    count: 8,
    loadingText: '正在加载更多...'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieService: MovieService) {
    this.loadMore.start = 0;
    this.getReyingMovie();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReyingPage');
  }

  getReyingMovie() {
    this.movieService.getReyingMovieData(this.loadMore.start, this.loadMore.count).subscribe(data => {
      this.movie_reying_data = data.data;
      this.loadMore.start = this.loadMore.count;
    }, error => {
      alert(error);
    });
  }

  /*上拉更新*/
  doInfinite(infiniteScroll) {  /*接收事件对象传值*/
    setTimeout(() => {
      this.movieService.getReyingMovieData(this.loadMore.start, this.loadMore.count).subscribe(data => {
        let newData = data.data;
        this.movie_reying_data = this.movie_reying_data.concat(newData);
        this.loadMore.start += this.loadMore.count;
        infiniteScroll.complete();
        if (newData.length < this.loadMore.count) {
          // this.loadMore.loadingText = '亲，我是有底线的';
          infiniteScroll.enable(false);
        }
      }, error => {
        alert(error);
      });
    }, 500);
  }

}
