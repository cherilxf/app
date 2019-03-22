import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import {BuyTicketPage} from "../buy-ticket/buy-ticket";
import {CinemaService} from "./cinema.service";

/**
 * Generated class for the CinemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cinema',
  templateUrl: 'cinema.html',
  providers: [CinemaService]
})
export class CinemaPage {
  public movie_id :any;
  public cinema_data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cinemaService: CinemaService,
    public alertCtrl: AlertController) {
    this.movie_id = this.navParams.get('movieId');
  }

  ionViewDidLoad() {}

  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }
  ionViewDidEnter() {
    this.getCinemaData();
  }
  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }
  ionViewDidLeave() {}

  getCinemaData(){
    this.cinemaService.getCinemaData_service(this.movie_id).subscribe(data => {
      if (data.data) {
        this.cinema_data = data.data;
      } else {
        this.showAlert("该影片未有影院放映！");
      }
    }, error => {
      alert(error);
    });
  }

  goBuyTicketPage(item){
    let cinemaId = item.id;
    this.navCtrl.push(BuyTicketPage,{
      "cinemaId": cinemaId,
      "movieId": this.movie_id
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
}
