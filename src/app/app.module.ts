/* 根模块 告诉ionic如何组装应用 */
/* 引入angular以及ionic的系统模块 */
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

/* 引入components模块 */
import { ComponentsModule } from '../components/components.module';

/* 引入根组件 */
import { MyApp } from './app.component';

/* 页面自定义组件 */
import { HomePage } from '../pages/home/home';
import { MoviePage } from '../pages/movie/movie';
import { RankingListPage } from '../pages/ranking-list/ranking-list';
import { FenleiPage } from '../pages/fenlei/fenlei';
import { PersonalCenterPage } from '../pages/personal-center/personal-center';
import { TabsPage } from '../pages/tabs/tabs';



/* ionic打包成app以后配置启动动画以及导航条的服务 不用管 */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [   /* 声明组件 */
    MyApp,
    HomePage,
    MoviePage,
    RankingListPage,
    FenleiPage,
    PersonalCenterPage,
    TabsPage
  ],
  imports: [   /* 引入的模块 依赖的模块*/
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],   /* 默认启动的模块 */
  entryComponents: [  /* 配置不会在模板中使用的组件 */
    MyApp,
    HomePage,
    MoviePage,
    RankingListPage,
    FenleiPage,
    PersonalCenterPage,
    TabsPage
  ],
  providers: [   /* 配置服务 */
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
