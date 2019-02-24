import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieService} from "../movie/movie.service";

/**
 * Generated class for the ComesoonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comesoon',
  templateUrl: 'comesoon.html',
  providers: [MovieService]
})
export class ComesoonPage {
  public movie_comesoon_data : any;

  public loadMore ={
    start: 0,
    count: 8,
    loadingText: '正在加载更多...'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieService: MovieService) {
    this.loadMore.start = 0;
    this.getComesoonMovie();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ComesoonPage');
  }


  getComesoonMovie() {
    this.movieService.getComesoonMovieData(this.loadMore.start, this.loadMore.count).subscribe(data => {
      this.movie_comesoon_data = data.data;
      this.loadMore.start = this.loadMore.count;
    }, error => {
      alert(error);
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.movieService.getComesoonMovieData(this.loadMore.start, this.loadMore.count).subscribe(data => {
        let newData = data.data;
        this.movie_comesoon_data = this.movie_comesoon_data.concat(newData);
        this.loadMore.start += this.loadMore.count;
        infiniteScroll.complete();
        if (newData.length < this.loadMore.count) {
          infiniteScroll.enable(false);
          // this.loadMore.loadingText = '亲，我是有底线的';
        }
      }, error => {
        alert(error);
      });
    }, 500);
  }
}
