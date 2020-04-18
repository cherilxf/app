import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MovieService} from "../movie/movie.service";
import {MovieDetailPage} from "../movie-detail/movie-detail";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieService: MovieService,
    public alertCtrl: AlertController,) {
    this.loadMore.start = 0;
    this.getReyingMovie();
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

  getReyingMovie() {
    this.movieService.getReyingMovieData_service(this.loadMore.start, this.loadMore.count).subscribe(data => {
      this.movie_reying_data = data.data;
      this.loadMore.start = this.loadMore.count;
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  goMovieDetailPage(movie) {
    this.navCtrl.push(MovieDetailPage, {
      movieId: movie.id
    });
  }

  /*上拉更新*/
  doInfinite(infiniteScroll) {  /*接收事件对象传值*/
    setTimeout(() => {
      this.movieService.getReyingMovieData_service(this.loadMore.start, this.loadMore.count).subscribe(data => {
        let newData = data.data;
        this.movie_reying_data = this.movie_reying_data.concat(newData);
        this.loadMore.start += this.loadMore.count;
        infiniteScroll.complete();
        if (newData.length < this.loadMore.count) {
          // this.loadMore.loadingText = '亲，我是有底线的';
          infiniteScroll.enable(false);
        }
      }, error => {
        this.showAlert('服务器出错啦！');
      });
    }, 500);
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
}
