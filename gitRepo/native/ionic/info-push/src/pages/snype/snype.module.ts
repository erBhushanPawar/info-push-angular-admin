import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SnypePage } from './snype';

@NgModule({
  declarations: [
    SnypePage,
  ],
  imports: [
    IonicPageModule.forChild(SnypePage),
  ],
})
export class SnypePageModule {}
