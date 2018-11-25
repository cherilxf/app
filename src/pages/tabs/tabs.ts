import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {MoviePage} from '../movie/movie';
import {RankingListPage} from "../ranking-list/ranking-list";
import {FenleiPage} from '../fenlei/fenlei';
import {PersonalCenterPage} from "../personal-center/personal-center";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MoviePage;
  tab3Root = RankingListPage;
  tab4Root = FenleiPage;
  tab5Root = PersonalCenterPage;

  constructor() {

  }
}
