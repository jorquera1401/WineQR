import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import { ActivatedRoute, Router } from "@angular/router";
import { VinaService } from "src/app/services/vina.service";
import { AstMemoryEfficientTransformer } from '@angular/compiler';
 


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  
 
  bars:any;
  colorArray : any;


  error : boolean;
  id:any;
  resultado:any;
  resultado_predio : any;
  resultado_cosecha : any;
  resultado_carga : any;
  resultado_bodega : any;
  resultado_almacen:any;
  resultado_descarga:any;
  hash:any;
  constructor(private router:Router,private activatedRoute:ActivatedRoute, private vinaService:VinaService) {
      
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ;
    console.log("codigo: ",this.id);
    this.cargarCarga(this.id);
    this.cargarDescarga();
    this.cargarBodega();
 
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

  async cargarDescarga(){
    await this.vinaService.getDescarga().subscribe(
      result=>{
        if(result){
          let descarga = {
            total : result.total,
            promedio : result.promedioDistancia
          }
          this.resultado_descarga = descarga;
        }else{
          console.log('no existen datos de descarga');
        }
      }
    )
  }

  async cargarBodega(){
    await this.vinaService.getBodega().subscribe(
        result => {
          if(result){
            let bodega = {
              total : result.total,
              humedadPromedio : result.humedadPromedio,
              temperaturaPromedio : result.temperaturaPromedio,
              primerRegistro : result.primerRegistro,
              ultimoRegistro : result.ultimoRegistro,
            
            }
            this.resultado_bodega = bodega;

          }else{
            console.log('No existen Datos Bodega');
            this.error  =true; 
        }
        }
      )
    await this.vinaService.getAlmacen().subscribe(
      result=>{
        if(result){
          let almacen = {
            total : result.total,
            humedadPromedio:result.humedadPromedio,
            temperaturaPromedio:result.temperaturaPromedio,
            primerRegistro : result.primerRegistro,
            ultimoRegistro : result.ultimoRegistro
          }
          this.resultado_almacen = almacen;
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
          console.log("Codigo en Cosecha: "+this.hash);
          this.cargarVina(cosecha.hash_entrada)   
        }else{
          console.log("no hay datos");
          this.error = true;
        }
      }
    );
  }

  /**
   * Funcion que  permite cargar desde la api los datos de la viña
   * @param codigo codigo hash que identifica la viña
   */
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
          console.log("no hay datos de viña");
          this.error = true;
        }
      }
    )
  }
  /**
   * Funcion que permite cargar datos desde la api con descripcion del predio de la viña
   * @param codigo codigo hash que identifica del predio de la viña
   */
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

/**
 * Cuando se presiona sobre la tarjeta de viña para visualizar el detalle
 */
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

verBodega():void{
  // let valores = this.id.split('c');
  // console.log(parseInt(valores[0]));
  this.router.navigate(['/bodega/'+this.id]);  
}

verDescarga():void{
  this.router.navigate(['/descarga/'+this.id]);
}

}
