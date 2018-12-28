import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieService} from "../../movie/movie.service";

/**
 * Generated class for the ReyingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reying',
  templateUrl: 'reying.html',
  providers: [MovieService]
})
export class ReyingPage {
  reying_movie_data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private movieService : MovieService) {
    this.getReyingMovie();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ReyingPage');
  }

  getReyingMovie() {
    this.movieService.getReyingMovieData().subscribe(data => {
      this.reying_movie_data = data.data;
    }, error => {
      alert(error);
    });
  }

}
