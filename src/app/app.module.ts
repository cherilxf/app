/* 根模块 告诉ionic如何组装应用 */
/* 引入angular以及ionic的系统模块 */
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms' //引入表单模块
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { IonicStorageModule } from "@ionic/storage";

/* 引入components模块 */
import { ComponentsModule } from '../components/components.module';

/* 引入根组件 */
import { MyApp } from './app.component';

/* 引入全局配置信息 */
import { AppConfig } from "./app.config";

/* 页面自定义组件 */
import { WelcomePage } from "../pages/welcome/welcome";

import { GoLoginPage } from "../pages/go-login/go-login";
import { LoginPage } from "../pages/go-login/login/login";

import { HomePage } from '../pages/home/home';

import { ReyingPage } from "../pages/reying/reying";
import { ComesoonPage } from "../pages/comesoon/comesoon";

import { MoviePage } from '../pages/movie/movie';
import { RankingListPage } from '../pages/ranking-list/ranking-list';

import { GenrePage } from "../pages/genre/genre";

import { PersonalCenterPage } from '../pages/personal-center/personal-center';
import { SettingPage } from "../pages/personal-center/setting/setting";
import { PersonalInfoSettingPage } from "../pages/personal-center/personal-info-setting/personal-info-setting";
import { MovieTicketPage } from "../pages/personal-center/movie-ticket/movie-ticket";
import { WishMoviePage } from "../pages/personal-center/wish-movie/wish-movie";
import { HaveSeenMoviePage } from "../pages/personal-center/have-seen-movie/have-seen-movie";
import {
  NameSettingPage,
  SexSettingPage,
  DescriptionSettingPage }
  from "../pages/personal-center/personal-info-setting/personal-info-setting";

import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { CommentDetailPage } from '../pages/comment-detail/comment-detail';
import { BuyTicketPage } from "../pages/buy-ticket/buy-ticket";
import { CinemaPage } from "../pages/cinema/cinema";

import { TabsPage } from '../pages/tabs/tabs';


/* ionic打包成app以后配置启动动画以及导航条的服务 不用管 */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [   /* 声明组件 */
    MyApp,

    WelcomePage,

    GoLoginPage,
    LoginPage,

    HomePage,
    ReyingPage,
    ComesoonPage,

    MoviePage,
    RankingListPage,
    GenrePage,

    PersonalCenterPage,
    SettingPage,
    PersonalInfoSettingPage,
    MovieTicketPage,
    WishMoviePage,
    HaveSeenMoviePage,
    NameSettingPage,
    SexSettingPage,
    DescriptionSettingPage,

    MovieDetailPage,
    CommentDetailPage,
    BuyTicketPage,
    CinemaPage,

    TabsPage,
  ],
  imports: [   /* 引入的模块 依赖的模块*/
    BrowserModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    IonicModule.forRoot(MyApp,{
      // tabsHideOnSubPages: "true",
      backButtonText: "" /*配置返回按钮*/
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],   /* 默认启动的模块 */
  entryComponents: [  /* 配置不会在模板中使用的组件 */
    MyApp,

    WelcomePage,

    GoLoginPage,
    LoginPage,

    HomePage,
    ReyingPage,
    ComesoonPage,

    MoviePage,
    RankingListPage,
    GenrePage,

    PersonalCenterPage,
    SettingPage,
    PersonalInfoSettingPage,
    MovieTicketPage,
    WishMoviePage,
    HaveSeenMoviePage,
    NameSettingPage,
    SexSettingPage,
    DescriptionSettingPage,

    MovieDetailPage,
    CommentDetailPage,
    BuyTicketPage,
    CinemaPage,

    TabsPage,
  ],
  providers: [   /* 配置服务 */
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
