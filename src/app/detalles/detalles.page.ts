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
  hash:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute, private vinaService:VinaService) {
      
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ;
    console.log("codigo: ",this.id);
    this.cargarCosecha(this.id);
  }

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

verCompleto():void{
  this.router.navigate(['/ventana/'+this.resultado_predio.hash])
}

}
