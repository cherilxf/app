import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "ionic-angular";
import { MovieComponent } from './movie/movie';
import { CinemaComponent } from './cinema/cinema';

@NgModule({
	declarations: [MovieComponent,
    CinemaComponent
  ],
	imports: [
	  BrowserModule,
    IonicModule.forRoot(ComponentsModule)
  ],
	exports: [MovieComponent,
    CinemaComponent
  ]
})
export class ComponentsModule {}
