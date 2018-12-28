import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieService} from "../../movie/movie.service";

/**
 * Generated class for the ComesoonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comesoon',
  templateUrl: 'comesoon.html',
  providers: [MovieService]
})
export class ComesoonPage {
  comesoon_movie_data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private movieService: MovieService) {
    this.getComesoonMovie();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ComesoonPage');
  }


  getComesoonMovie() {
    this.movieService.getComesoonMovieData().subscribe(data => {
      this.comesoon_movie_data = data.data;
    }, error => {
      alert(error);
    });
  }
}
