import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, Slides} from 'ionic-angular';
import {GenreService} from "./genre.service";
import {MovieDetailPage} from "../movie-detail/movie-detail";

/**
 * Generated class for the GenrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-genre',
  templateUrl: 'genre.html',
  providers: [GenreService]
})
export class GenrePage {
  @ViewChild(Slides) slides: Slides;

  public genreNav: String = '动作';
  public genresArr: any[] = [
    {"index": "0", "navName": "动作"},
    {"index": "1", "navName": "喜剧"},
    {"index": "2", "navName": "科幻"},
    {"index": "3", "navName": "恐怖"},
    {"index": "4", "navName": "爱情"},
    {"index": "5", "navName": "动画"},
    {"index": "6", "navName": "剧情"},
  ];

  public movie_list = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private genreService: GenreService,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.getMovieGenreData();
  }
  ionViewWillEnter() {}
  ionViewDidEnter() {}
  ionViewWillLeave() {}
  ionViewDidLeave() {}


  selectNavItem(index) {
    this.movie_list = [];
    this.slides.slideTo(index, 100);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.movie_list = [];
    for (let i = 0; i < this.genresArr.length; i++) {
      if (this.genresArr[i].index === currentIndex.toString()) {
        this.genreNav = this.genresArr[i].navName;
        this.getMovieGenreData();
        break;
      }
    }

    this.slides.lockSwipes(true);
    this.slides.slideTo(currentIndex, 300);
    this.slides.lockSwipes(false);
  }

  getMovieGenreData() {
    let loading = this.loadingCtrl.create({
      content: '加载数据中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();

    this.genreService.getMovieGenreData_service(this.genreNav).subscribe(data => {
      setTimeout(()=>{
        loading.dismiss().then(()=>{
          this.movie_list = data.data;
        });
      },1000);
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  goMovieDetailPage(movie) {
    this.navCtrl.push(MovieDetailPage, {
      movieId: movie.id
    });
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
