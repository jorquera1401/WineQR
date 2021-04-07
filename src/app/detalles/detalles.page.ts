import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
import { VinaService } from "src/app/services/vina.service";


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  error : boolean;
  id:any;
  resultado:any;
  resultado_predio : any;
  resultado_cosecha : any;
  resultado_carga : any;
  hash:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute, private vinaService:VinaService) {
      
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ;
    console.log("codigo: ",this.id);
    this.cargarCarga(this.id);
  }

  /**
   * Carga desde la API los valores de la carga
   * @param codigo codigo hash que se captura desde el codigo QR
   */
  cargarCarga(codigo:any):void{
    this.vinaService.getCarga(codigo).subscribe(
      result =>{
        if(result.length>0){
          let carga ={
            id : result[0].id,
            peso : result[0].peso,
            fecha : result[0].fecha,
            descripcion : result[0].descripcion,
            hash_salida : result[0].hash_salida,
            hash_entrada : result[0].hash_entrada
          }
          this.resultado_carga = carga;
          this.cargarCosecha(carga.hash_entrada)
        }else{
          console.log("No existen Datos");
          this.error = true;
        }
      }
    )
  }

  /**
   * 
   * @param codigo codigo hash de entrada que viene desde la funcion cargar Carga
   */
  cargarCosecha(codigo:any):void{
    this.vinaService.getCosecha(codigo).subscribe(
      result =>{
        if(result.length>0){
          let cosecha ={
            id: result[0].id,
            humedad : result[0].humedad,
            temperatura  :result[0].temperatura,
            fecha : result[0].fecha,
            descripcion :result[0].descripcion,
            hash_salida : result[0].hash_salida,
            hash_entrada : result[0].hash_entrada,
          }
          this.resultado_cosecha = cosecha;
          this.hash = cosecha.hash_entrada;
          this.cargarVina(cosecha.hash_entrada)   
        }else{
          console.log("no hay datos");
          this.error = true;
        }
      }
    );
  }

  cargarVina(codigo:any):void{
    this.vinaService.getVina(codigo).subscribe(
      result=>{
        if(result.length>0){
          let vina ={
            id : result[0].id,
            nombre: result[0].nombre,
            direccion:result[0].direccion,
            descripcion : result[0].descripcion,
            hash : result[0].hash
          }
          this.resultado=vina; 
          this.cargarPredio(vina.hash); 
        }else{
          console.log("no hay datos");
          this.error = true;
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
          descripcion:result[0].descripcion,
          hash : result[0].hash
          }
          
        this.resultado_predio = predio;
        }
    )
    console.log(this.resultado_predio)
  }

verVina():void{
  console.log(this.resultado.hash)
  this.router.navigate(['/vina/'+this.resultado.hash])
}
verPredio():void{
  this.router.navigate(['/ventana/'+this.resultado_predio.hash])
}
verCosecha():void{
  this.router.navigate(['/cosecha/'+this.resultado_cosecha.hash_salida])
}
verCarga():void{
  this.router.navigate(['/carga/'+this.resultado_carga.hash_salida])

}

}
