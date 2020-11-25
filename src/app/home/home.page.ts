import { Component, OnInit } from '@angular/core';
import {  QRScanner,QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {Router  } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data : any;
  constructor(private qrScanner:QRScanner, private router:Router) { }

  

  ngOnInit() {
    
  }
  navegar():void{
    this.router.navigate(['/detalle/1'])
  }
  capturar():void{
    this.qrScanner.prepare().then(
      (status:QRScannerStatus)=>{
        if(status.authorized){
          let scanSub = this.qrScanner.scan().subscribe((text:string)=>{
            console.log("Escaneo: ", text);
            this.data=text;
            this.qrScanner.hide();
            scanSub.unsubscribe();
          });
        }else if(status.denied){
          console.log("no se puede abrir");
        }else{
          console.log("No se puede hacer nada");
        }
      }
    ).catch((e:any)=>console.log("error es "+e));
  }

  

}
