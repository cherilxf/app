import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieTicketPage } from './movie-ticket';

@NgModule({
  declarations: [
    MovieTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieTicketPage),
  ],
})
export class MovieTicketPageModule {}
