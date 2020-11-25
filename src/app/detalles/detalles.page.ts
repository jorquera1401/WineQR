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

  resultado:any;
  constructor(private activatedRoute:ActivatedRoute, private vinaService:VinaService) {
      
   }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id') ;
    console.log("codigo: ",id);
    this.vinaService.getVina(id).subscribe(
      result=>{
        console.log(result);
        let vina = {
          id : result[0].id,
          nombre: result[0].nombre,
          direccion:result[0].direccion,
          descripcion : result[0].descripcion
          
        }
        this.resultado=vina;
        console.log(this.resultado)
      }
    )
  }

}
