import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QralumnoPage } from './qralumno.page';

const routes: Routes = [
  {
    path: '',
    component: QralumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QralumnoPageRoutingModule {}
