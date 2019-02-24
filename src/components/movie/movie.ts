import {Component, ViewChild} from '@angular/core';
import {MovieService} from "../../pages/movie/movie.service";
import {Slides} from "ionic-angular";


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

  public loadMore = {
    startReying: 0,
    startComesoon: 0,
    count: 6,
    loadingText: '正在加载更多...'
  };

  constructor(private movieService: MovieService) {
    this.getReyingMovie();
    this.getComesoonMovie();
  }

  getReyingMovie() {
    this.movieService.getReyingMovieData(this.loadMore.startReying, this.loadMore.count).subscribe(data => {
      this.movie_reying_data = data.data;
      this.loadMore.startReying = this.loadMore.count;
    }, error => {
      alert(error);
    });
  }

  getComesoonMovie() {
    this.movieService.getComesoonMovieData(this.loadMore.startComesoon, this.loadMore.count).subscribe(data => {
      this.movie_comesoon_data = data.data;
      this.loadMore.startComesoon = this.loadMore.count;
    }, error => {
      alert(error);
    });
  }

  /*上拉更新*/
  loadMoreReyingMovie(infiniteScroll) {  /*接收事件对象传值*/
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

  }

  loadMoreComesoonMovie(infiniteScroll) {
    setTimeout(() => {
      this.movieService.getComesoonMovieData(this.loadMore.startComesoon, this.loadMore.count).subscribe(data => {
        let newData = data.data;
        this.movie_comesoon_data = this.movie_comesoon_data.concat(newData);
        this.loadMore.startComesoon += this.loadMore.count;
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
