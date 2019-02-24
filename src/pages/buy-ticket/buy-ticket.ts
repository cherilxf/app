import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {CinemaService} from "../cinema/cinema.service";
import {BuyTicketService} from "./buy-ticket.service";

/**
 * Generated class for the BuyTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-ticket',
  templateUrl: 'buy-ticket.html',
  providers: [BuyTicketService]
})
export class BuyTicketPage {
  @ViewChild(Slides) slides: Slides;

  public tabArr: any[] = [
    {"index": "0", "tabName": "今天"},
    {"index": "1", "tabName": "明天"},
    {"index": "2", "tabName": "后天"}
  ];
  public buyTicketTab = '今天';

  public movieId : String;
  public cinemaId : String;
  public cinemaDeatilData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private buyTicketService: BuyTicketService) {
    this.movieId = this.navParams.get('movieId');
    this.cinemaId = this.navParams.get('cinemaId');
    this.getCinemaDetail(this.cinemaId);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BuyTicketPage');
  }

  getCinemaDetail(cinemaId){
    this.buyTicketService.getCinemaDetailData(this.movieId).subscribe(data => {
      console.log(data.data);
      this.cinemaDeatilData = data.data;
    }, error => {
      alert(error);
    });
  }

  segmentChanged(event) {

    let tabName = event.value;
    let index;
    for (let i = 0; i < this.tabArr.length; i++) {
      if (this.tabArr[i].tabName == tabName) {
        index = i;
        break;
      }
    }
    this.slides.slideTo(index);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    // this.setStyle(index);
    this.slides.slideTo(currentIndex, 300);
    // console.log(index);
    for (let i = 0; i < this.tabArr.length; i++) {
      if (this.tabArr[i].index === currentIndex.toString()) {
        this.buyTicketTab = this.tabArr[i].tabName;
        // console.log(this.fenleiNav);
        return;
      }
    }
  }

}
