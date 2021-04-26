import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentanaPageRoutingModule } from './ventana-routing.module';

import { VentanaPage } from './ventana.page';

import {ChartsModule} from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentanaPageRoutingModule,
    ChartsModule
  ],
  declarations: [VentanaPage]
})
export class VentanaPageModule {}
