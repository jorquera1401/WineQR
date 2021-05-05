import { Injectable } from '@angular/core';
import {  HttpClient } from "@angular/common/http";
import {  Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class VinaService {

  direccion ='http://192.168.0.109';
  puerto = ':8000'; 
  urlVina = this.direccion+this.puerto+'/api/vina/';
  urlPredio = this.direccion+this.puerto+'/api/predio/';
  urlCosecha = this.direccion+this.puerto+'/api/cosecha/';
  urlCarga = this.direccion+this.puerto+'/api/carga/';
  urlDescarga = this.direccion+this.puerto+'/api/descarga';
  urlAlmacen = this.direccion+this.puerto+'/api/almacen';
  urlBodega = this.direccion+this.puerto+'/api/bodega';
  vinaImage = this.direccion+this.puerto+'/api/vinaimage';
  predioImage = this.direccion+this.puerto+'/api/predioimage';
  cosechaImage = this.direccion+this.puerto+'/api/cosechaimage';
  cargaImage = this.direccion+this.puerto+'/api/cargaimage';
  descargaImage = this.direccion+this.puerto+'/api/descargaimage';
  almacenImage = this.direccion+this.puerto+'/api/almacenimage';
  bodegaImage = this.direccion+this.puerto+'/api/bodegaimage';

  constructor(private http:HttpClient) { }

  /**
   * Se hace consultas a la API REST
   * @param id identificador de la viña
   */
  getVina(id:any):Observable<any>{
    return this.http.get(this.urlVina+id);
  }

  getPredio(id:any):Observable<any>{
    return this.http.get(this.urlPredio+id);
  }

  getCosecha(id:any):Observable<any>{
    return this.http.get(this.urlCosecha+id);
  }

  getCarga(id:any):Observable<any>{
    return this.http.get(this.urlCarga+id);
  }

  getDescarga():Observable<any>{
    return this.http.get(this.urlDescarga);
  }

  getAlmacen():Observable<any>{
    return this.http.get(this.urlAlmacen);
  }

  getBodega():Observable<any>{
    return this.http.get(this.urlBodega);
  }

  getVinaImage():Observable<any>{
    return this.http.get(this.vinaImage);
  }
  getPredioImage():Observable<any>{
    return this.http.get(this.predioImage);
  }
  getCosechaImage():Observable<any>{
    return this.http.get(this.cosechaImage);
  }
  getCargaImage():Observable<any>{
    return this.http.get(this.cargaImage);
  }
  getDescargaImage():Observable<any>{
    return this.http.get(this.descargaImage);
  }
  getAlmacenImage():Observable<any>{
    return this.http.get(this.almacenImage);
  }
  getBodegaImage():Observable<any>{
    return this.http.get(this.bodegaImage);
  }


}