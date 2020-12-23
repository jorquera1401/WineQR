import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentanaPage } from './ventana.page';

const routes: Routes = [
  {
    path: '',
    component: VentanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentanaPageRoutingModule {}
