import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {GoLoginPage} from "../go-login/go-login";

declare let $: any;
/**
 * Generated class for the CommentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment-detail',
  templateUrl: 'comment-detail.html',
})
export class CommentDetailPage {
  public has_login = false;
  public user_data : any = {
    "user_nickname": "",
    "user_head_sculpture": ""
  };
  public comment_data : any = {};
  public reply_data: any = [
    {
      "id": "201910001",
      "head_sculpture": "assets/imgs/MEAN.jpg",
      "nickname": "cherilxf",
      "content": "hahaha，实在是太好笑了。。。",
      "create_time": "2019-02-05 06:16:14",
      "zan_count": 20
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController) {
    this.comment_data = this.navParams.get("comment_data");
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
    this.storage.get("user_data").then((data) => {
      this.user_data.user_nickname = data.nickname;
      this.user_data.user_head_sculpture = data.head_sculpture;
    });
    this.storage.get("has_login").then((data) => {
      this.has_login = data;
    });
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

  replyComment(){
    if(!this.has_login){
      this.showAlert("亲，您还没有登录呢！");
    }else{
      let replyTextEle = $('.reply-text');
      let reply_contetnt = replyTextEle.val();
      let reply_item = {
        "id": "201910001",
        "head_sculpture": this.user_data.user_head_sculpture,
        "nickname": this.user_data.user_nickname,
        "content": reply_contetnt,
        "create_time": "2019-02-05 06:16:14",
        "zan_count": 20
      };
      this.reply_data.push(reply_item);
      replyTextEle.val("");
    }
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {
          this.navCtrl.push(GoLoginPage,{});
        }
      }],
    });
    alert.present();
  }
}
