import { Component, OnInit,AfterViewInit,ElementRef,ViewChild, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute  } from "@angular/router";
import { ChartDataSets, ChartType } from 'chart.js';
import { Label,Color} from 'ng2-charts';
import {  VinaService} from "src/app/services/vina.service";
 
 

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.page.html',
  styleUrls: ['./ventana.page.scss'],
})
export class VentanaPage implements OnInit{

 
  public chartDataBodega:ChartDataSets[] = [{data:[],label:'Temperatura'},{data:[],label:"Humedad"}];
  public chartDataAlmacen:ChartDataSets[]  =[{data:[],label:'Temperatura'},{data:[],label:"Humedad"}];
  public chartDataDescarga:ChartDataSets[]  =[{data:[],label:'Distancia Estacionamiento (mts)'}];
  
  public chartTypeBodega:ChartType='line';
  public chartTypeAlmacen:ChartType='line';
  public chartTypeDescarga:ChartType='line';

  
  public chartColorsBodega : Color[] = [{backgroundColor:'#e3823d',borderColor:'#db4826'},{backgroundColor:'#51c1d9',borderColor:'#1c92ba'}];
  public chartColorsAlmacen : Color[] = [{backgroundColor:'#fa542d',borderColor:'#cc0001'},{backgroundColor:'#cceef7',borderColor:'#4dbbd7'}];
  public chartColorsDescarga : Color[] = [{backgroundColor:'#fa542d',borderColor:'#cc0001'}];


  public chartLabelsAlmacen : Label[];
  public chartLabelsBodega : Label[];
  public chartLabelsDescarga : Label[];


  codigo : any;
  caracteristica:any;
  caracteristica_vina :any;
  caracteristica_cosecha : any;
  caracteristica_carga : any;
  public caracteristica_bodega:any;
  public caracteristica_almacen:any;
  public caracteristica_descarga : any;
  
  //Imagenes
  public imagenVina     :any;
  public imagenPredio   :any;
  public imagenCosecha  :any;
  public imagenCarga    :any;
  public imagenDescarga :any;
  public imagenAlmacen  :any;
  public imagenBodega   :any;
  constructor(private activatedRoute:ActivatedRoute, private vinaService:VinaService) { }

  //Recibo la informacion de lo que se hizo click en la ventana de detalle
  ngOnInit() {
    let co = this.activatedRoute.snapshot.paramMap.get('cosecha');
    let id = this.activatedRoute.snapshot.paramMap.get('objeto');
    let ca = this.activatedRoute.snapshot.paramMap.get('carga');
    let vi = this.activatedRoute.snapshot.paramMap.get('vina');
    let bo = this.activatedRoute.snapshot.paramMap.get('bodega');
    let de = this.activatedRoute.snapshot.paramMap.get('descarga');

 
    if(id){
      this.cargarPredio(id);
      this.getPredioImage();
    }
    
    if(co){
      this.cargarCosecha(co);
      this.getCosechaImage();

    }
    if(ca){
      this.cargarCarga(ca);
      this.getCargaImage();
    }
    if(vi){
      this.cargarVina(vi);
      this.getVinaImage();
    }
    if(bo){
      this.cargarBodega(bo);
      this.cargarAlmacen();
    }
    if(de){
      console.log(de);
      this.cargarDescarga(de);
      this.getDescargaImage();
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

  /**
   * Se cargan los graficos y las vistas 
   * @param id 
   */
  cargarBodega(id):void{
    this.codigo = id;
    this.vinaService.getBodega().subscribe(
        result => {
        
          if(result){
            let bodega = {
              total : result.total,
              humedadPromedio : result.humedadPromedio,
              temperaturaPromedio : result.temperaturaPromedio,
              temperatura : result.temperatura,
              humedad : result.humedad,
              fecha : result.fecha,
              hora : result.hora,
              primerRegistro : result.primerRegistro,
              ultimoRegistro : result.ultimoRegistro,
            }

            this.chartDataBodega[0].data=[];
            
            this.chartLabelsBodega=[];
            this.chartLabelsBodega = bodega.hora;
            this.chartLabelsBodega[0]=bodega.primerRegistro.substring(0,11);
            this.chartLabelsBodega[this.chartLabelsBodega.length-1]=bodega.ultimoRegistro.substring(0,11);

            this.chartDataBodega[0].data=bodega.temperatura;
            this.chartDataBodega[1].data = bodega.humedad;
            this.caracteristica_bodega = bodega;
          }else{
            console.log('No existen Datos Bodega');      
         }
        }
    );
  }
  async cargarAlmacen(){
    await this.vinaService.getAlmacen().subscribe(
      result=>{
        if(result){
          let almacen = {
            total : result.total,
            humedadPromedio:result.humedadPromedio,
            temperaturaPromedio:result.temperaturaPromedio,
            temperatura: result.temperatura,
            humedad:result.humedad,
            fecha:result.fecha,
            hora:result.hora,
            primerRegistro : result.primerRegistro,
            ultimoRegistro : result.ultimoRegistro
          }
          this.chartDataAlmacen[0].data = [];

          this.chartLabelsAlmacen=[];
          this.chartLabelsAlmacen = almacen.hora;
          this.chartLabelsAlmacen[0] = almacen.primerRegistro.substring(0,11);
          this.chartLabelsAlmacen[this.chartLabelsAlmacen.length-1] = almacen.ultimoRegistro.substring(0,11);


          this.chartDataAlmacen[0].data = almacen.temperatura;
          this.chartDataAlmacen[1].data = almacen.humedad;
          this.caracteristica_almacen = almacen;                 
        }else{
          console.log("No existen registro de Almacen");
        }
      }
    )
  }
  async cargarDescarga(id){
    this.codigo =id;
    await this.vinaService.getDescarga().subscribe(
      result=>{
        if(result){
          let descarga = {
            total : result.total,
            promedio : result.promedioDistancia,
            fecha : result.fecha,
            hora : result.hora,
            distancia : result.distancia
          }
          this.caracteristica_descarga = descarga;
          this.chartDataDescarga[0].data = [];
          this.chartLabelsDescarga = descarga.hora;
          this.chartLabelsDescarga[0] = descarga.fecha[0];
          this.chartLabelsDescarga[this.chartLabelsDescarga.length-1]=descarga.fecha[descarga.fecha.length-1];
          this.chartDataDescarga[0].data = descarga.distancia;
        }else{
          console.log('No existen Registros de Descarga')
        }
      }
    )
  }

 
  async getVinaImage(){
    await this.vinaService.getVinaImage().subscribe(
      result =>{
        let vina = {
          imagen : result.imagen
        }
        this.imagenVina = vina.imagen;
      }
    )
  }

  async getPredioImage(){
    await this.vinaService.getPredioImage().subscribe(
      result=>{
        let predio = {
          imagen : result.imagen
        }
        this.imagenPredio = predio.imagen;
      }
    )
  }

  async getCosechaImage(){
    await this.vinaService.getCosechaImage().subscribe(
      result=>{
        let cosecha = {
          imagen : result.imagen
        }
        this.imagenCosecha = cosecha.imagen;
      }
    )
  }

  async getCargaImage(){
    await this.vinaService.getCargaImage().subscribe(
      result =>{
        let carga = {
          imagen : result.imagen
        }

        this.imagenCarga = carga.imagen;
        
      }
    )
  }

  async getDescargaImage(){
    await this.vinaService.getDescargaImage().subscribe(
      result =>{
        let descarga = {
          imagen:result.imagen
        }
        this.imagenDescarga = descarga.imagen;
      }
    )
  }

  async getAlmacenImage(){
    await this.vinaService.getAlmacenImage().subscribe(
      result=>{
        let almacen = {
          imagen:result.imagen
        }
        this.imagenAlmacen = almacen.imagen;
      }
    )
  }

  async getBodegaImage(){
    await this.vinaService.getBodegaImage().subscribe(
      result=>{
        let bodega = {
          imagen:result.imagen
        }
        this.imagenBodega = bodega.imagen;
      }
    )
  }

}
