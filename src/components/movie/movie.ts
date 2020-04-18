import {Component, ViewChild} from '@angular/core';
import {MovieService} from "../../pages/movie/movie.service";
import {AlertController, LoadingController, NavController, NavParams, Slides} from "ionic-angular";
import {MovieDetailPage} from "../../pages/movie-detail/movie-detail";


/**
 * Generated class for the MovieComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie',
  templateUrl: 'movie.html',
  providers: [MovieService]
})
export class MovieComponent {
  @ViewChild(Slides) slides: Slides;

  public MovieListTabs = '正在热映';

  public movie_reying_data: any;
  public movie_comesoon_data: any;

  public loadData = {
    startReying: 0,
    startComesoon: 0,
    count: 10,
    loadingText: '正在加载更多...'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieService: MovieService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: '加载数据中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();
    setTimeout(()=>{
      loading.dismiss().then(()=>{
        this.getReyingMovie();
        this.getComesoonMovie();
      });
    },1000);
  }

  getReyingMovie() {
    this.movieService.getComesoonMovieData_service(this.loadData.startReying, this.loadData.count).subscribe(data => {
      this.movie_reying_data = data.data;
      this.loadData.startReying = this.loadData.count;
    }, error => {
      this.showAlert(error);
    });
  }

  getComesoonMovie() {
    this.movieService.getComesoonMovieData_service(this.loadData.startComesoon, this.loadData.count).subscribe(data => {
      this.movie_comesoon_data = data.data;
      this.loadData.startComesoon = this.loadData.count;
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

  /*上拉更新*/
  loadDataReyingMovie(infiniteScroll) {  /*接收事件对象传值*/
    setTimeout(() => {
      this.movieService.getReyingMovieData_service(this.loadData.startReying, this.loadData.count).subscribe(data => {
        let newData = data.data;
        this.movie_reying_data = this.movie_reying_data.concat(newData);
        this.loadData.startReying += this.loadData.count;
        infiniteScroll.complete();
        if (newData.length < this.loadData.count) {
          // infiniteScroll.enable(false);
          this.loadData.loadingText = '亲，我是有底线的';
        }
      }, error => {
        this.showAlert('服务器出错啦！');
      });
    }, 500);

  }

  loadDataComesoonMovie(infiniteScroll) {
    setTimeout(() => {
      this.movieService.getComesoonMovieData_service(this.loadData.startComesoon, this.loadData.count).subscribe(data => {
        let newData = data.data;
        this.movie_comesoon_data = this.movie_comesoon_data.concat(newData);
        this.loadData.startComesoon += this.loadData.count;
        infiniteScroll.complete();
        if (newData.length < this.loadData.count) {
          infiniteScroll.enable(false);
          // this.loadData.loadingText = '亲，我是有底线的';
        }
      }, error => {
        this.showAlert(error);
      });
    }, 500);
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
