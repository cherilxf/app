<<<<<<< HEAD
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MovieService} from "./movie.service";
import {MovieDetailPage} from "../movie-detail/movie-detail";

declare let $: any;
=======
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

>>>>>>> first commit

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
<<<<<<< HEAD
  providers: [MovieService]
})
export class MoviePage {

  public MovieTabs = '电影';

  public movie_reying_data: any;
  public loadData = {
    startReying: 0,
    startComesoon: 0,
    count: 10,
    loadingText: '正在加载更多...'
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieService: MovieService) {

  }

  ionViewDidLoad() {}

  MovieTabsChanged() {}

  loadDataReyingMovie(infiniteScroll) {
    setTimeout(() => {
      this.movieService.getReyingMovieData_service(this.loadData.startReying, this.loadData.count).subscribe(data => {
        let newData = data.data;
        this.movie_reying_data = this.movie_reying_data.concat(newData);
        this.loadData.startReying += this.loadData.count;
        infiniteScroll.complete();
        if (newData.length < this.loadData.count) {
          infiniteScroll.enable(false);
          // this.loadData.loadingText = '亲，我是有底线的';
        }
      }, error => {
        alert(error);
      });
    }, 1000);
  }

  scrollDo(){
    console.log(111)
=======
})
export class MoviePage {
  public flag = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviePage');
  }

  goMovieList(){
    this.flag = true;
  }
  goCinema(){
    this.flag = false;
>>>>>>> first commit
  }
}
