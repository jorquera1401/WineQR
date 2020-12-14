import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { VinaService } from "src/app/services/vina.service";
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  error : boolean;
  resultado:any;
  resultado_predio : any;
  hash:any;
  constructor(private activatedRoute:ActivatedRoute, private vinaService:VinaService) {
      
   }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id') ;
    console.log("codigo: ",id);
    this.vinaService.getVina(id).subscribe(
      result=>{
        if(result.length>0){
        console.log(result);
        let vina = {
          id : result[0].id,
          nombre: result[0].nombre,
          direccion:result[0].direccion,
          descripcion : result[0].descripcion,
          hash : result[0].hash
        }
        this.hash=vina.hash;
        this.resultado=vina; 
        this.cargarPredio(vina.hash);
      }else{
        console.log("no hay datos");
        this.error=true;
      }
      }
    )
  }

  cargarPredio(codigo:any):void{
    this.vinaService.getPredio(codigo).subscribe(
      result=>{
        let predio = {
          id : result[0].id,
          nombre:result[0].nombre,
          locacion :result[0].locacion,
          tipo : result[0].tipo,
          descripcion:result[0].descripcion
          }
          
        this.resultado_predio = predio;
        }
    )
  }

}
