<<<<<<< HEAD
import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {RankingListService} from "./ranking-list.service";
import {MovieDetailPage} from "../movie-detail/movie-detail";
=======
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
>>>>>>> first commit

/**
 * Generated class for the RankingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranking-list',
  templateUrl: 'ranking-list.html',
<<<<<<< HEAD
  providers: [RankingListService]
})
export class RankingListPage {
  public rankingTab = "口碑高分";
  public movie_list = [];
  public loadMore = {
    startReying: 0,
    startComesoon: 0,
    count: 6,
    loadingText: '正在加载更多...'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rankingListService: RankingListService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

  }


  ionViewDidLoad() {
    this.getMovieRankingData();
  }
  ionViewWillEnter(){}

  segmentChanged(event) {
    this.movie_list = [];
    this.getMovieRankingData();
  }

  /*上拉更新*/
  loadMoreReyingMovie(infiniteScroll) {  /*接收事件对象传值*/
    infiniteScroll.complete();
    /*    if (this.MovieListTabs == '正在热映') {
          setTimeout(() => {
            this.movieService.getReyingMovieData(this.loadMore.startReying, this.loadMore.count).subscribe(data => {
              let newData = data.data;
              this.movie_reying_data = this.movie_reying_data.concat(newData);
              this.loadMore.startReying += this.loadMore.count;
              infiniteScroll.complete();
              if (newData.length < this.loadMore.count) {
                // infiniteScroll.enable(false);
                this.loadMore.loadingText = '亲，我是有底线的';
              }
            }, error => {
              alert(error);
            });
          }, 500);
        } else if (this.MovieListTabs == '即将上映') {
          setTimeout(() => {
            this.movieService.getComesoonMovieData(this.loadMore.startComesoon, this.loadMore.count).subscribe(data => {
              let newData = data.data;
              this.movie_comesoon_data = this.movie_comesoon_data.concat(newData);
              this.loadMore.startComesoon += this.loadMore.count;
              infiniteScroll.complete();
              if (newData.length < this.loadMore.count) {
                // infiniteScroll.enable(false);
                this.loadMore.loadingText = '亲，我是有底线的';
              }
            }, error => {
              alert(error);
            });
          }, 500);
        }*/
  }

  getMovieRankingData(){
    let loading = this.loadingCtrl.create({
      content: '加载数据中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();

    this.rankingListService.getMovieRankingData_service(this.rankingTab).subscribe(data => {
      setTimeout(()=>{
        loading.dismiss().then(()=>{
          this.movie_list = data.data;
        });
      },1000);
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  goMovieDetailPage(movie) {
    this.navCtrl.push(MovieDetailPage, {
      movieId: movie.id
    });
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {

        }
      }],
    });
    alert.present();
  }
=======
})
export class RankingListPage {
  public MovieRanking = "todayTopRanking";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingListPage');
  }

>>>>>>> first commit
}
