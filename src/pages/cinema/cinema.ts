import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

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
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {

    this.movie_id = this.navParams.get('movieId');
  }

  ionViewDidLoad() {
    this.getCinemaData();
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

  getCinemaData(){
    let loading = this.loadingCtrl.create({
      content: '加载数据中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();
    this.cinemaService.getCinemaData_service(this.movie_id).subscribe(data => {
      if (data.state) {
        if(data.data !== null){
          setTimeout(()=>{
            loading.dismiss().then(()=>{
              this.cinema_data = data.data;
            });//显示多久消失
          },1000);
        }else{
          setTimeout(()=>{
            loading.dismiss();//显示多久消失
            this.showAlert("该影片未有影院放映！");
          },1000);
        }
      } else {
        this.showAlert('数据无法获取！');
      }
    }, error => {
      this.showAlert('服务器出错啦！');
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
