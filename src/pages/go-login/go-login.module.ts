import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoLoginPage } from './go-login';

@NgModule({
  declarations: [
    GoLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(GoLoginPage),
  ],
})
export class GoLoginPageModule {}
