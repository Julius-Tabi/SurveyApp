import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdScreenPageRoutingModule } from './third-screen-routing.module';

import { ThirdScreenPage } from './third-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThirdScreenPageRoutingModule
  ],
  declarations: [ThirdScreenPage]
})
export class ThirdScreenPageModule {}
