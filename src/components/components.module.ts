import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "ionic-angular";
<<<<<<< HEAD
import { MovieComponent } from './movie/movie';
import { CinemaComponent } from './cinema/cinema';

@NgModule({
	declarations: [MovieComponent,
    CinemaComponent
=======
import { MovieListComponent } from './movie-list/movie-list';
import { MovieCinemaComponent } from './movie-cinema/movie-cinema';

@NgModule({
	declarations: [
	  MovieListComponent,
    MovieCinemaComponent
>>>>>>> first commit
  ],
	imports: [
	  BrowserModule,
    IonicModule.forRoot(ComponentsModule)
  ],
<<<<<<< HEAD
	exports: [MovieComponent,
    CinemaComponent
=======
	exports: [
	  MovieListComponent,
    MovieCinemaComponent
>>>>>>> first commit
  ]
})
export class ComponentsModule {}
