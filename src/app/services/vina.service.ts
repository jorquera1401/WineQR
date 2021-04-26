import { Injectable } from '@angular/core';
import {  HttpClient } from "@angular/common/http";
import {  Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class VinaService {

  constructor(private http:HttpClient) { }

  /**
   * Se hace consultas a la API REST
   * @param id identificador de la viña
   */
  getVina(id:any):Observable<any>{
    return this.http.get('http://192.168.0.109:8000/api/vina/'+id);
  }

  getPredio(id:any):Observable<any>{
    return this.http.get('http://192.168.0.109:8000/api/predio/'+id);
  }

  getCosecha(id:any):Observable<any>{
    return this.http.get('http://192.168.0.109:8000/api/cosecha/'+id);
  }

  getCarga(id:any):Observable<any>{
    return this.http.get('http://192.168.0.109:8000/api/carga/'+id);
  }

  getDescarga():Observable<any>{
    return this.http.get('http://192.168.0.109:8000/api/descarga');
  }

  getAlmacen():Observable<any>{
    return this.http.get('http://192.168.0.109:8000/api/almacen');
  }

  getBodega():Observable<any>{
    return this.http.get('http://192.168.0.109:8000/api/bodega');
  }


}