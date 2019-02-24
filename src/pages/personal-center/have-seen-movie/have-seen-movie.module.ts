import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HaveSeenMoviePage } from './have-seen-movie';

@NgModule({
  declarations: [
    HaveSeenMoviePage,
  ],
  imports: [
    IonicPageModule.forChild(HaveSeenMoviePage),
  ],
})
export class HaveSeenMoviePageModule {}
