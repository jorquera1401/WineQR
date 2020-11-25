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
    return this.http.get('http://127.0.0.1:8000/api/vina/'+id);
  }
}
