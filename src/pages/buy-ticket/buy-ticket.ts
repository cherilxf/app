import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  ActionSheetController,
  IonicPage,
  NavController,
  NavParams,
  Slides,
  LoadingController
} from 'ionic-angular';
import {BuyTicketService} from "./buy-ticket.service";
import {Storage} from "@ionic/storage";
import {GoLoginPage} from "../go-login/go-login";
import {TicketInfoPage} from "./ticket-info/ticket-info";

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

  public loadFinish: boolean = false;
  public has_login: boolean;
  public user_data: any = {};
  public movie_id: String = "";
  public cinema_id: String = "";
  public cinema_data: any = {};
  public current_movie_data: any = [];
  public date: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private buyTicketService: BuyTicketService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.loadFinish = false;

    this.movie_id = this.navParams.get('movieId');
    this.cinema_id = this.navParams.get('cinemaId');

    this.storage.get("has_login").then((result) => {
      this.has_login = result;
    });
    this.storage.get("user_data").then((data) => {
      this.user_data = data;
    });

    this.setDate();  // 获取当天日期
    this.getCinemaData(this.cinema_id);
  }

  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }
  ionViewDidEnter() {}
  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }
  ionViewDidLeave() {}

  getCinemaData(cinemaId) {
    let loading = this.loadingCtrl.create({
      content: '加载数据中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();

    this.buyTicketService.getCinemaData_service(cinemaId).subscribe(data => {
      if (data.state) {
        if(data.data !== null){
          setTimeout(()=>{
            loading.dismiss().then(()=>{
              this.cinema_data = data.data;
              this.setMovieData();
              this.loadFinish = true;
            });//显示多久消失
          },1000);
        }else{
          setTimeout(()=>{
            loading.dismiss().then(()=>{
              this.showAlert("影院暂无数据！");
            });//显示多久消失
          },1000);
        }
      } else {
        setTimeout(()=>{
          loading.dismiss().then(()=>{
            this.showAlert("数据获取失败！");
          });//显示多久消失
        },1000);
      }
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  setMovieData() {
    let movies = this.cinema_data.movies;

    if (this.movie_id) {
      for (let i = 0; i < movies.length; i++) {
        if (this.movie_id == movies[i].movie_id) {
          this.cinema_data.movies.unshift(movies[i]);
          this.cinema_data.movies.splice(i + 1, 1);
        }
      }
    }
    this.current_movie_data = movies[0];
  }

  setDate() {
    for (let i = 0; i <= 2; i++) {
      this.date.push(this.getDate(i));
    }
  }
  getDate(AddDayCount) {
    let today = new Date();
    today.setDate(today.getDate() + AddDayCount);//获取AddDayCount天后的日期
    let m = today.getMonth() + 1;//获取当前月份的日期
    let d = today.getDate();
    return m + "-" + d;
  }

  goPayPage(scene) {
    if (this.has_login) {
      this.navCtrl.push(TicketInfoPage, {
        user_accound: this.user_data.accound,
        movie_scene: scene,
        cinema_data: this.cinema_data,
        movie_data: this.current_movie_data
      });
    } else {
      this.navCtrl.push(GoLoginPage, {});
    }
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

  movieSlideChanged() {
    let currentIndex = this.movie_item_slides.getActiveIndex();
    let movies = this.cinema_data.movies;
    if (currentIndex < movies.length) {
      this.current_movie_data = movies[currentIndex];
    }
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