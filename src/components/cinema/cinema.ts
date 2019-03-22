import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {CinemaService} from "../../pages/cinema/cinema.service";
import {BuyTicketPage} from "../../pages/buy-ticket/buy-ticket";

/**
 * Generated class for the CinemaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cinema',
  templateUrl: 'cinema.html',
  providers: [CinemaService]
})
export class CinemaComponent {

  public cinema_data: any;
  public loadMore = {
    startReying: 0,
    startComesoon: 0,
    count: 6,
    loadingText: '正在加载更多...'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cinemaService: CinemaService) {
    this.getCinemaData();
  }

  getCinemaData(){
    this.cinemaService.getCinemaData_service(null).subscribe(data => {
      this.cinema_data = data.data;
    }, error => {
      alert(error);
    });
  }
  goBuyTicketPage(){
    this.navCtrl.push(BuyTicketPage,{
      "movieId": null,
      "cinemaId": this.cinema_data.id
    })
  }
  /*上拉更新*/
  /*loadMoreReyingMovie(infiniteScroll) {  /!*接收事件对象传值*!/
    setTimeout(() => {
      this.movieService.getReyingMovieData_service(this.loadMore.startReying, this.loadMore.count).subscribe(data => {
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
  }*/
}
