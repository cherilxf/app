import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

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
})
export class RankingListPage {
  public MovieRanking = "todayTopRanking";
  public loadMore = {
    startReying: 0,
    startComesoon: 0,
    count: 6,
    loadingText: '正在加载更多...'
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingListPage');
  }

  segmentChanged(event) {

  }

  /*上拉更新*/
  loadMoreReyingMovie(infiniteScroll) {  /*接收事件对象传值*/
    console.log(111);
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
}
