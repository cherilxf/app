import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {MoviePage} from '../movie/movie';
import {RankingListPage} from "../ranking-list/ranking-list";
import {GenrePage} from "../genre/genre";
import {PersonalCenterPage} from "../personal-center/personal-center";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MoviePage;
  tab3Root = RankingListPage;
  tab4Root = GenrePage;
  tab5Root = PersonalCenterPage;

  constructor() {

  }
}
