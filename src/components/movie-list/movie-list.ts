import { Component } from '@angular/core';

/**
 * Generated class for the MovieListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'movie-list',
  templateUrl: 'movie-list.html'
})
export class MovieListComponent {
  public flag = true;

  constructor() {
  }

  goReying(){
    this.flag = true;
  }
  goComesoon(){
    this.flag = false;
  }
}
