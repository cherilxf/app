import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
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
  @ViewChild("movie_item_slides") movie_item_slides: Slides;
  @ViewChild("movie_scene_slides") movie_scene_slides: Slides;

  public tabArr: any[] = [
    {"index": "0", "tabName": "今天"},
    {"index": "1", "tabName": "明天"},
    {"index": "2", "tabName": "后天"}
  ];
  public buyTicketTab = '今天';

  public movie_id : String = "";
  public cinema_id: String = "";
  public cinema_data: any = {};
  public movie_data: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private buyTicketService: BuyTicketService,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BuyTicketPage');
  }
  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }

    this.movie_id = this.navParams.get('movieId');
    this.cinema_id = this.navParams.get('cinemaId');
  }
  ionViewDidEnter() {
    this.getCinemaData(this.cinema_id);
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

  getCinemaData(cinemaId){
    this.buyTicketService.getCinemaData_service(cinemaId).subscribe(data => {
      if (data.data) {
        this.cinema_data = data.data;
        this.setMovieData();
      } else {
        this.showAlert("数据无法获取！");
      }
    }, error => {
      alert(error);
    });
  }
  setMovieData(){
    let movies = this.cinema_data.movies;
    if(this.movie_id){
      for(let i = 0;i < movies.length;i++){
        if(this.movie_id == movies[i].movie_id){
          this.cinema_data.movies.unshift(movies[i]);
          this.cinema_data.movies.splice(i,1);
        }
      }
    }
    this.movie_data = movies[0];
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

  segmentChanged(index) {
    this.movie_scene_slides.slideTo(index);
  }
  movieSlideChanged(){

  }
  sceneSlideChanged() {
    let currentIndex = this.movie_scene_slides.getActiveIndex();
    // this.setStyle(index);
    for (let i = 0; i < this.tabArr.length; i++) {
      if (this.tabArr[i].index === currentIndex.toString()) {
        this.buyTicketTab = this.tabArr[i].tabName;
        break;
      }

      this.movie_scene_slides.lockSwipes(true);
      this.movie_scene_slides.slideTo(currentIndex, 300);
      this.movie_scene_slides.lockSwipes(false);
    }
  }
}
