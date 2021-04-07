import { Component, OnInit } from '@angular/core';
import {ActivatedRoute  } from "@angular/router";
import {  VinaService} from "src/app/services/vina.service";

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.page.html',
  styleUrls: ['./ventana.page.scss'],
})
export class VentanaPage implements OnInit {
  codigo : any;
  caracteristica:any;
  caracteristica_vina :any;
  caracteristica_cosecha : any;
  caracteristica_carga : any;
  constructor(private activatedRoute:ActivatedRoute, private vinaService:VinaService) { }

  //Recibo la informacion de lo que se hizo click en la ventana de detalle
  ngOnInit() {
    let co = this.activatedRoute.snapshot.paramMap.get('cosecha');
    let id = this.activatedRoute.snapshot.paramMap.get('objeto');
    let ca = this.activatedRoute.snapshot.paramMap.get('carga');
    let vi = this.activatedRoute.snapshot.paramMap.get('vina');
    console.log('vina',vi)
    if(id){
      this.cargarPredio(id);
    }
    
    if(co){
      this.cargarCosecha(co);

    }
    if(ca){
      this.cargarCarga(ca);
    }
    if(vi){
      this.cargarVina(vi)
    }
  }
  cargarVina(id):void{
    console.log(id)
    this.vinaService.getVina(id).subscribe(
      result=>{
        
        let vina ={
          descripcion : result[0].descripcion,
          direccion : result[0].direccion,
          id : result[0].id,
          nombre:result[0].nombre,
          hash:result[0].hash
        }
        this.caracteristica_vina = vina;
        this.codigo = vina.hash
      }
    )
    console.log(this.caracteristica_vina)
  }

  cargarPredio(id):void{
    console.log("Datos Predio : "+id);    
    this.vinaService.getPredio(id).subscribe(
      result=>{
        
        let predio = {
          id : result[0].id,
          nombre:result[0].nombre,
          locacion :result[0].locacion,
          tipo : result[0].tipo,
          descripcion:result[0].descripcion,
          hash : result[0].hash
        }
        this.caracteristica = predio;
        this.codigo = predio.hash;
      }
    )
    console.log(this.caracteristica);
  }
  cargarCosecha(id):void{
    console.log("Cosecha Datos: ",id);
    this.vinaService.getCosecha(id).subscribe(
      result=>{
        console.log(result);
        let cosecha = {
          id : result[0].id,
          descripcion : result[0].descripcion,
          fecha : result[0].fecha,
          temperatura : result[0].temperatura,
          humedad : result[0].humedad,
          hash_entrada  : result[0].hash_entrada,
          hash_salida : result[0].hash_salida
        }
        this.caracteristica_cosecha = cosecha;
        this.codigo = cosecha.hash_entrada;
      }
    )
    console.log(this.caracteristica_cosecha);
    console.log("Codigo : ",this.codigo)
  }
  cargarCarga(id):void{
    console.log("Carga Datos: ",id);
    this.vinaService.getCarga(id).subscribe(
      result=>{
        console.log(result);
        let carga = {
          id : result[0].id,
          fecha:result[0].fecha,
          hash_entrada : result[0].hash_entrada,
          hash_salida : result[0].hash_salida,
          peso : result[0].peso,
          descripcion : result[0].descripcion
        }
        this.caracteristica_carga = carga;
        let codigo_hash = carga.hash_entrada;
        let cadena = codigo_hash.split('c');
        this.codigo = parseInt(cadena[0])
      }
    )
    console.log(this.caracteristica_carga);
    console.log("codigo : ",this.codigo);
  }
}
