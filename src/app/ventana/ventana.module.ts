import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentanaPageRoutingModule } from './ventana-routing.module';

import { VentanaPage } from './ventana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentanaPageRoutingModule
  ],
  declarations: [VentanaPage]
})
export class VentanaPageModule {}
