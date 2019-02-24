import { Component } from '@angular/core';
import {MovieService} from "../../pages/movie/movie.service";

/**
 * Generated class for the CinemaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cinema',
  templateUrl: 'cinema.html'
})
export class CinemaComponent {

  public movie_reying_data: any;
  public loadMore = {
    startReying: 0,
    startComesoon: 0,
    count: 6,
    loadingText: '正在加载更多...'
  };

  constructor(private movieService: MovieService ) {

  }
  /*上拉更新*/
  loadMoreReyingMovie(infiniteScroll) {  /*接收事件对象传值*/
    setTimeout(() => {
      this.movieService.getReyingMovieData(this.loadMore.startReying, this.loadMore.count).subscribe(data => {
        let newData = data.data;
        console.log(newData);
        // this.movie_reying_data = this.movie_reying_data.concat(newData);
        this.loadMore.startReying += this.loadMore.count;
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
