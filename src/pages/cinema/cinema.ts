import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public movieId :any;
  public cinemaData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cinemaService: CinemaService) {
    this.movieId = this.navParams.get('movieId');
    this.getCinemaData();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CinemaPage');
  }

  getCinemaData(){
    this.cinemaService.getCinemaData(this.movieId).subscribe(data => {
      console.log(data.data);
      this.cinemaData = data.data;
    }, error => {
      alert(error);
    });
  }
  goBuyTicketPage(){
    this.navCtrl.push(BuyTicketPage,{
      movieId: this.movieId,
      cinemaId: this.cinemaData.id
    })
  }
}
