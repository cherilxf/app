import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { MoviePage } from './movie';
import {MyApp} from "../../app/app.component";

@NgModule({
  declarations: [
    MoviePage,
  ],
  imports: [
    IonicPageModule.forChild(MoviePage)
  ],
})
export class MoviePageModule {}
