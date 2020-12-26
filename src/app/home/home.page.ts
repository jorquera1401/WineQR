import { Component, OnInit } from '@angular/core';
//import {  QRScanner,QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import {Router  } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data : any;
  codigoHash : string="";
  constructor(private barcodeScanner:BarcodeScanner, private router:Router) { }

  

  ngOnInit() {
    
  }
  navegar():void{
    console.log(this.codigoHash);
    if(this.codigoHash.length>0){
    this.router.navigate(['/detalle/'+this.codigoHash])
    }else{
      console.log("ingresar codigo")
    }
  }

  capturar():void{
    this.data=null;
    this.barcodeScanner.scan().then(barcodeData=>{
      console.log("Dato: ",barcodeData);
      this.data=barcodeData;
      this.router.navigate(['detalle/'+this.data])
    }).catch(err=>{
      console.log("Algun error", err);
    });
  }

  /*
  capturar():void{
    this.qrScanner.prepare().then(
      (status:QRScannerStatus)=>{
        if(status.authorized){
          let scanSub = this.qrScanner.scan().subscribe((codigo:string)=>{
            console.log("Escaneo: ", codigo);
            this.data=codigo;
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
  }*/

  

}
