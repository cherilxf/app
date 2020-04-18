import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ToastController, AlertController} from 'ionic-angular';
import {Storage} from "@ionic/storage";

import {LoginService} from "./login.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'register.html',
  providers: [LoginService]
})
export class RegisterPage {
  public registerData = {
    accound: "",
    password: "",
    confirmPassword: ""
  };
  public accoundLegal: boolean = false;
  public registerBtnState: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }

    this.accoundLegal = false;
    this.registerBtnState = true;
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

  accoundCheck() {
    if (this.registerData.accound.length == 0) {
      this.registerToast("手机号不能为空！", "tip", false);
      this.accoundLegal = false;
    } else {
      this.accoundLegal = true;
    }
  }

  confirmPw() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registerToast("密码不一致！", "error", false);
    }
  }

  contractConfirm(event) {
    if (event.checked) {
      this.registerBtnState = false;
    } else {
      this.registerBtnState = true;
    }
  }

  registerDo() {
    if (!this.accoundLegal) {
      this.accoundCheck();
    } else if (this.registerData.password.length == 0 || this.registerData.confirmPassword.length == 0) {
      this.registerToast("密码不能为空！", "tip", false);
    } else if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registerToast("密码不一致！", "error", false);
    } else {
      let registerData = {
        accound: this.registerData.accound,
        password: this.registerData.password,
        nickname: this.registerData.accound,
        head_sculpture: "assets/imgs/default.jpg",
        sex: 1,
        birthday: "1996-08-06",
        description: "",
        movie_ticket: [],
        coupon: [],
        wish_movie: [],
        have_seen_movie: []
      };

      this.loginService.register_service(registerData).subscribe(data => {
        if (data.state == 1) {
          this.showAlert("注册成功！", true);
        } else if(data.state == 0) {
          this.registerToast("该用户信息已存在","error",false);
        } else{
          this.showAlert('注册失败！',false);
        }
      }, error => {
        this.showAlert('服务器出错啦！',false);
      });
    }
  }

  showAlert(warnText, state) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: [{
        text: '确定',
        handler: () => {
          if(state){
            this.navCtrl.pop();
          }
        }
      }],
    });
    alert.present();
  }

  registerToast(tipText: string, classstyle: string, registerState: boolean) {
    const toast = this.toastCtrl.create({
      message: tipText,     //需要提示的信息
      position: "middle",               //位置
      // showCloseButton: true,            //是否显示关闭按钮
      // closeButtonText: 'Ok',            //关闭按钮的文字内容
      cssClass: classstyle              //自定义的样式
    });
    toast.present();

    setTimeout(() => {
      toast.dismiss();
      if (registerState) {
        this.navCtrl.pop();
      }
    }, 1000);
  }
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginService,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {

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

  goBack() {
    this.navCtrl.popToRoot();
  }

  goRegister() {
    this.navCtrl.push(RegisterPage, {});
  }

  logIn(accound: HTMLInputElement, password: HTMLInputElement) {
    let loginData = {
      accound: accound.value,
      password: password.value
    };

    if (loginData.accound.length == 0) {
      // this.showAlert('请输入账号');
      this.loginToast("请输入账号", "tip", false);
    } else if (loginData.password.length == 0) {
      // this.showAlert('请输入密码');
      this.loginToast("请输入密码", "tip", false);
    } else {
      this.loginService.login_service(loginData).subscribe(data => {
        let loginState = data.state;
        let user_data = data.user_data;
        if (loginState === null) {
          this.storage.set('has_login', false);
          // this.showTip('账号错误',false);
          this.loginToast("账号错误", "error", false);
        } else if (loginState === false) {
          this.storage.set('has_login', false);
          // this.showTip('密码错误',false);
          this.loginToast("密码错误", "error", false);
        } else if (loginState === true) {
          this.storage.set('has_login', true);
          this.storage.set('user_data', user_data);
          // this.showTip("登录成功！",true);
          this.loginToast("登录成功！", "success", true);  //调用方式
        } else {
          this.showAlert('服务器出错啦！');
        }
      }, error => {
        this.showAlert('服务器出错啦！');
      });
    }
  }

  showAlert(warnText) {
    const alert = this.alertCtrl.create({
      title: warnText,
      buttons: ['确定']
    });
    alert.present();
  }

  loginToast(tipText: string, classstyle: string, loginState: boolean) {
    const toast = this.toastCtrl.create({
      message: tipText,     //需要提示的信息
      position: "middle",               //位置
      // showCloseButton: true,            //是否显示关闭按钮
      // closeButtonText: 'Ok',            //关闭按钮的文字内容
      cssClass: classstyle              //自定义的样式
    });
    toast.present();

    setTimeout(() => {
      toast.dismiss();
      if (loginState) {
        this.navCtrl.popToRoot();
      }
    }, 1000);
  }
}

