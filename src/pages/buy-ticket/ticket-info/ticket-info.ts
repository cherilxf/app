import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from 'ionic-angular';
import {TicketInfoService} from "./ticket-info.service";

declare let $: any;

/**
 * Generated class for the TicketInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ticket-info',
  templateUrl: 'ticket-info.html',
  providers: [TicketInfoService]
})
export class TicketInfoPage {
  public userAccound: String = "";
  public movieData: any = {};
  public cinemaData: any = {};
  public movieScene: any = {};
  public seatData: any = [];

  public ticket_count : number = 0;
  public ticket_seats_data : any = [];
  public sum_price: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ticketInfoService: TicketInfoService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
  }
  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }

    this.userAccound = this.navParams.get("user_accound");
    this.movieData = this.navParams.get("movie_data");
    this.cinemaData = this.navParams.get("cinema_data");
    this.movieScene = this.navParams.get("movie_scene");

    this.seatData = this.movieScene.hall.seat;
    this.sum_price = parseFloat(this.movieScene.single_price) * this.ticket_count;
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

  async payStyleActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      title: "请选择支付方式",
      buttons: [
        {
          text: "支付宝支付",
          icon: "zfbPay",
          handler: () => {
            this.pay();
          }
        },
        {
          text: "微信支付",
          icon: "wechatPay",
          handler: () => {
            this.pay();
          }
        },
        {
          text: "银行卡支付",
          icon: "cartPay",
          handler: () => {
            this.pay();
          }
        },
        {
          text: "更多其他支付方式",
          handler: () => {

          }
        },
        {
          text: "取消",
          icon: "close",
          role: "cancle",
          handler: () => {
          }
        },
      ]
    });
    await actionSheet.present();
  }

  pay() {
    let loading = this.loadingCtrl.create({
      content: '正在支付中...'//数据加载中显示
    });
    //显示等待样式
    loading.present();

    let orderTime = new Date().toLocaleString('chinese', {hour12: false}).replace(/\//g, '-');
    let orderId = Number(Math.random().toString().substr(3, 12) + Date.now()).toString(36);
    let today = new Date().toLocaleDateString().replace(/\//g, '-');

    let ticketOrder = {
      id: orderId,
      user_accound: this.userAccound,
      movie_id: this.movieData.movie_id,
      movie_title: this.movieData.title,
      ticket_count: Number(this.ticket_count),
      order_time: orderTime,
      movie_start_time: today + " " + this.movieScene.time_start,
      movie_end_time: today + " " + this.movieScene.time_end,   //"2018-09-15 12:39"
      movie_type: this.movieScene.type,
      movie_hall: this.movieScene.hall.hall_name,
      seats: this.ticket_seats_data,
      cinema: this.cinemaData.name,
      single_price: this.movieScene.single_price,
      sum_price: Number(this.sum_price),
      state: 0
    };

    this.ticketInfoService.addOrderData_service(ticketOrder).subscribe(data => {
      if (data.state) {
        setTimeout(()=>{
          loading.dismiss().then(()=>{
            this.showAlert("支付成功！",true);
          });//显示多久消失
        },1000);
      } else {
        setTimeout(()=>{
          loading.dismiss().then(()=>{
            this.showAlert("支付失败！",false);
          });//显示多久消失
        },1000);
      }
    }, error => {
      this.showAlert('服务器出错啦！',false);
    });
  }

  selectSeat(seat,row,col){
    if(seat == 0){
      this.seatData[row][col] = 1;

      this.ticket_seats_data.push([row+1,col+1]);
      this.ticket_count++;
      this.sum_price = parseFloat(this.movieScene.single_price) * this.ticket_count;
    }else{
      this.selectSeatToast("此座位已被选中或售出！", "seatTip");
    }
  }

  showAlert(warnText,payState) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {
          if(payState){
            this.navCtrl.popToRoot();
          }
        }
      }],
    });
    alert.present();
  }
  selectSeatToast(tipText: string,classStyle) {
    const toast = this.toastCtrl.create({
      message: tipText,     //需要提示的信息
      position: "middle",               //位置
      // showCloseButton: true,            //是否显示关闭按钮
      // closeButtonText: 'Ok',            //关闭按钮的文字内容
      cssClass: classStyle              //自定义的样式
    });
    toast.present();
    setTimeout(()=>{
      toast.dismiss();
      // if(loginState){
      //   this.navCtrl.push(PersonalCenterPage,{});
      // }
    },2000);
  }
}