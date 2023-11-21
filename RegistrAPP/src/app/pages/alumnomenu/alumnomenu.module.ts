import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnomenuPageRoutingModule } from './alumnomenu-routing.module';

import { AlumnomenuPage } from './alumnomenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnomenuPageRoutingModule
  ],
  declarations: [AlumnomenuPage]
})
export class AlumnomenuPageModule {}
