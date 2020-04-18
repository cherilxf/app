import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from "ionic-angular";
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
    private cinemaService: CinemaService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      content: '加载数据中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();

    setTimeout(()=>{
      loading.dismiss().then(()=>{
        this.getCinemaData();
      });
    },1000);
  }

  getCinemaData() {
    this.cinemaService.getCinemaData_service(null).subscribe(data => {
      this.cinema_data = data.data;
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  goBuyTicketPage(item) {
    this.navCtrl.push(BuyTicketPage, {
      "movieId": null,
      "cinemaId": item.id
    })
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
        this.showAlert(error);
      });
    }, 500);
  }*/
}
