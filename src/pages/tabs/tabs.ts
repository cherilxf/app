import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {MoviePage} from '../movie/movie';
import {RankingListPage} from "../ranking-list/ranking-list";
<<<<<<< HEAD
import {GenrePage} from "../genre/genre";
=======
import {FenleiPage} from '../fenlei/fenlei';
>>>>>>> first commit
import {PersonalCenterPage} from "../personal-center/personal-center";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MoviePage;
  tab3Root = RankingListPage;
<<<<<<< HEAD
  tab4Root = GenrePage;
=======
  tab4Root = FenleiPage;
>>>>>>> first commit
  tab5Root = PersonalCenterPage;

  constructor() {

  }
}
