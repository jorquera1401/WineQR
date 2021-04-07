import {  NgModule} from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path:'detalle/:id', 
    loadChildren:()=>import('./detalles/detalles.module').then(m=>m.DetallesPageModule)
  },
  {
    path: 'ventana/:objeto',
    loadChildren: () => import('./ventana/ventana.module').then( m => m.VentanaPageModule)
  },
  {
    path: 'cosecha/:cosecha',
    loadChildren:()=> import('./ventana/ventana.module').then(m=> m.VentanaPageModule)
  },
  {
    path : 'carga/:carga',
    loadChildren:()=> import('./ventana/ventana.module').then(m=>m.VentanaPageModule)
  },
  {
    path: 'vina/:vina',
    loadChildren:()=>import('./ventana/ventana.module').then(m=>m.VentanaPageModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
