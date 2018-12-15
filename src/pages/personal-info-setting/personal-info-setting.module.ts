import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalInfoSettingPage } from './personal-info-setting';

@NgModule({
  declarations: [
    PersonalInfoSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalInfoSettingPage),
  ],
})
export class PersonalInfoSettingPageModule {}
