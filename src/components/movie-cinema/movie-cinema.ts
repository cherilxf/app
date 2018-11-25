import { Component } from '@angular/core';

/**
 * Generated class for the MovieCinemaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie-cinema',
  templateUrl: 'movie-cinema.html'
})
export class MovieCinemaComponent {

  text: string;

  constructor() {
    console.log('Hello MovieCinemaComponent Component');
    this.text = 'Hello World';
  }

}
