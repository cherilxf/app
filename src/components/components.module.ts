import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "ionic-angular";
import { MovieListComponent } from './movie-list/movie-list';
import { MovieCinemaComponent } from './movie-cinema/movie-cinema';

@NgModule({
	declarations: [
	  MovieListComponent,
    MovieCinemaComponent
  ],
	imports: [
	  BrowserModule,
    IonicModule.forRoot(ComponentsModule)
  ],
	exports: [
	  MovieListComponent,
    MovieCinemaComponent
  ]
})
export class ComponentsModule {}
