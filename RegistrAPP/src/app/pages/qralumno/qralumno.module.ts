import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QralumnoPage } from './qralumno.page';

import { QralumnoPageRoutingModule } from './qralumno-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  imports: [
    ZXingScannerModule,
    CommonModule,
    FormsModule,
    IonicModule,
    QralumnoPageRoutingModule
  ],
  declarations: [QralumnoPage]
})
export class QralumnoPageModule {}
