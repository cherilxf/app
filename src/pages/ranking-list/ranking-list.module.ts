import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankingListPage } from './ranking-list';

@NgModule({
  declarations: [
    RankingListPage,
  ],
  imports: [
    IonicPageModule.forChild(RankingListPage),
  ],
})
export class RankingListPageModule {}
