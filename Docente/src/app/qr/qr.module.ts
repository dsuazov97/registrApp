import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

import { QrPage } from './qr.page';

@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageRoutingModule
  ],
  declarations: [QrPage]
})
export class QrPageModule {}
