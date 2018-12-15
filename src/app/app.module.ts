/* 根模块 告诉ionic如何组装应用 */
/* 引入angular以及ionic的系统模块 */
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms' //引入表单模块
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

/* 引入components模块 */
import { ComponentsModule } from '../components/components.module';

/* 引入根组件 */
import { MyApp } from './app.component';

/* 页面自定义组件 */
import { HomePage } from '../pages/home/home';
import { ReyingPage } from '../pages/home/home'
import { ComesoonPage } from "../pages/home/home";

import { MoviePage } from '../pages/movie/movie';
import { RankingListPage } from '../pages/ranking-list/ranking-list';
import { FenleiPage } from '../pages/fenlei/fenlei';

import { PersonalCenterPage } from '../pages/personal-center/personal-center';
import { SettingPage } from "../pages/personal-center/personal-center";

import { TabsPage } from '../pages/tabs/tabs';

import { MovieDetailPage } from '../pages/movie-detail/movie-detail';
import { CommentDetailPage } from '../pages/comment-detail/comment-detail';
import { BuyTicketPage } from "../pages/buy-ticket/buy-ticket";
import { CinemaPage } from "../pages/cinema/cinema";

import { PersonalInfoSettingPage, NameSettingPage, SexSettingPage, DescriptionSettingPage } from "../pages/personal-info-setting/personal-info-setting";

/* ionic打包成app以后配置启动动画以及导航条的服务 不用管 */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [   /* 声明组件 */
    MyApp,

    HomePage,
    ReyingPage,
    ComesoonPage,

    MoviePage,
    RankingListPage,
    FenleiPage,

    PersonalCenterPage,
    SettingPage,
    TabsPage,

    MovieDetailPage,
    CommentDetailPage,
    BuyTicketPage,
    CinemaPage,

    PersonalInfoSettingPage,
    NameSettingPage,
    SexSettingPage,
    DescriptionSettingPage,

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
      tabsHideOnSubPages: "true",
      backButtonText: "" /*配置返回按钮*/
    })
  ],
  bootstrap: [IonicApp],   /* 默认启动的模块 */
  entryComponents: [  /* 配置不会在模板中使用的组件 */
    MyApp,

    HomePage,
    ReyingPage,
    ComesoonPage,

    MoviePage,
    RankingListPage,
    FenleiPage,

    PersonalCenterPage,
    SettingPage,

    TabsPage,

    MovieDetailPage,
    CommentDetailPage,
    BuyTicketPage,
    CinemaPage,

    PersonalInfoSettingPage,
    NameSettingPage,
    SexSettingPage,
    DescriptionSettingPage,
  ],
  providers: [   /* 配置服务 */
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
