import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {MovieTicketService} from "./movie-ticket.service";

/**
 * Generated class for the MovieTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-ticket',
  templateUrl: 'movie-ticket.html',
  providers: [MovieTicketService]
})
export class MovieTicketPage {
  public user_accound: String;
  public ticket_data = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieTicketService: MovieTicketService,
    private storage: Storage,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {}
  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }

    this.storage.get("user_data").then((data) => {
      this.user_accound = data.accound;
      this.getTicketData();
    });
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

  getTicketData(){
    this.movieTicketService.getTicketData_service(this.user_accound).subscribe(data => {
      let ticketData = data.data;
      this.ticket_data = [];
      for(let i = ticketData.length - 1;i >= 0;i--){
        this.ticket_data.push(ticketData[i]);
      }
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  deleteOrder(item,index){
    let orderId = item.id;

    this.movieTicketService.delTicketData_service(orderId).subscribe(data => {
      if(data.state){
        this.movieTicketToast("删除成功！","ticketDelSuccess",index);
      }else{
        this.showAlert('删除失败！');
      }
    }, error => {
      this.showAlert('服务器出错啦！');
    });
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {}
      }],
    });
    alert.present();
  }

  movieTicketToast(tipText: string,classStyle, index) {
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
      this.ticket_data.splice(index,1);
    },1000);
  }
}
