import {Component, ViewChild} from '@angular/core';
import {MovieService} from "../../pages/movie/movie.service";
import {NavController, NavParams, Slides} from "ionic-angular";
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
    private movieService: MovieService) {
    this.getReyingMovie();
    this.getComesoonMovie();
  }

  getReyingMovie() {
    this.movieService.getComesoonMovieData_service(this.loadData.startReying, this.loadData.count).subscribe(data => {
      this.movie_reying_data = data.data;
      this.loadData.startReying = this.loadData.count;
    }, error => {
      alert(error);
    });
  }

  getComesoonMovie() {
    this.movieService.getComesoonMovieData_service(this.loadData.startComesoon, this.loadData.count).subscribe(data => {
      this.movie_comesoon_data = data.data;
      this.loadData.startComesoon = this.loadData.count;
    }, error => {
      alert(error);
    });
  }

  goMovieDetailPage(movie) {
    this.navCtrl.push(MovieDetailPage, {
      movieId: movie.id
    });
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
        alert(error);
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
        alert(error);
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
