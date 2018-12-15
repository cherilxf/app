import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

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
})
export class BuyTicketPage {
  @ViewChild(Slides) slides: Slides;

  public tabArr = [
    {"index": "0", "tabName": "今天"},
    {"index": "1", "tabName": "明天"},
    {"index": "2", "tabName": "后天"}
  ];
  public buyTicketTab = '今天';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyTicketPage');
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
