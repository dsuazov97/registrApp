import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnomenuPage } from './alumnomenu.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnomenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnomenuPageRoutingModule {}
