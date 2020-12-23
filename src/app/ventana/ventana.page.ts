import { Component, OnInit } from '@angular/core';
import {ActivatedRoute  } from "@angular/router";
import {  VinaService} from "src/app/services/vina.service";

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.page.html',
  styleUrls: ['./ventana.page.scss'],
})
export class VentanaPage implements OnInit {
  
  caracteristica:any;
  constructor(private activatedRoute:ActivatedRoute, private vinaService:VinaService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('objeto');
    console.log("Ventana : "+id);
    this.vinaService.getPredio(id).subscribe(
      result=>{
        console.log(result)
        let predio = {
          id : result[0].id,
          nombre:result[0].nombre,
          locacion :result[0].locacion,
          tipo : result[0].tipo,
          descripcion:result[0].descripcion,
          hash : result[0].hash
        }
        this.caracteristica = predio;
      }
    )
    console.log(this.caracteristica);
  }

}
