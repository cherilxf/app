import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MovieService} from "../movie/movie.service";
import {MovieDetailPage} from "../movie-detail/movie-detail";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieService: MovieService,
    public alertCtrl: AlertController) {
    this.loadMore.start = 0;
    this.getComesoonMovie();
  }

  ionViewDidLoad() {}
  ionViewWillEnter(){
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }
  ionViewDidEnter(){}
  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }


  getComesoonMovie() {
    this.movieService.getComesoonMovieData_service(this.loadMore.start, this.loadMore.count).subscribe(data => {
      this.movie_comesoon_data = data.data;
      this.loadMore.start = this.loadMore.count;
    }, error => {
      this.showAlert(error);
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
          this.navCtrl.pop();
        }
      }],
    });
    alert.present();
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.movieService.getComesoonMovieData_service(this.loadMore.start, this.loadMore.count).subscribe(data => {
        let newData = data.data;
        this.movie_comesoon_data = this.movie_comesoon_data.concat(newData);
        this.loadMore.start += this.loadMore.count;
        infiniteScroll.complete();
        if (newData.length < this.loadMore.count) {
          infiniteScroll.enable(false);
          // this.loadMore.loadingText = '亲，我是有底线的';
        }
      }, error => {
        this.showAlert('服务器出错啦！');
      });
    }, 500);
  }
}
