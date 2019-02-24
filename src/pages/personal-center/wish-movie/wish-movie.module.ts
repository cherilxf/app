import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WishMoviePage } from './wish-movie';

@NgModule({
  declarations: [
    WishMoviePage,
  ],
  imports: [
    IonicPageModule.forChild(WishMoviePage),
  ],
})
export class WishMoviePageModule {}
