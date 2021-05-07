
import {  VinaService} from "src/app/services/vina.service";

    let vinaService:VinaService ;

 
    export const  getVinaImage =  async ()=>{
        await vinaService.getVinaImage().subscribe(
          result =>{
            let vina = {
              imagen : result.imagen
            }
            return vina.imagen;
          }
        )
      }
    
    export const  getPredioImage = async ()=>{
        await vinaService.getPredioImage().subscribe(
          result=>{
            let predio = {
              imagen : result.imagen
            }
            return predio.imagen;
          }
        )
      }
    
     export  const  getCosechaImage = async ()=>{
        await vinaService.getCosechaImage().subscribe(
          result=>{
            let cosecha = {
              imagen : result.imagen
            }
            return cosecha.imagen;
          }
        )
      }
    
      export const  getCargaImage= async ()=>{
          console.log("hay imagen");
        await vinaService.getCargaImage().subscribe(
          result =>{
            let carga = {
              imagen : result.imagen
            }
    
            return carga.imagen;
            
          }
        )
      }
    
      export const getDescargaImage= async ()=>{
        await vinaService.getDescargaImage().subscribe(
          result =>{
            let descarga = {
              imagen:result.imagen
            }
            return descarga.imagen;
          }
        )
      }
    
      export const  getAlmacenImage= async ()=>{
        await vinaService.getAlmacenImage().subscribe(
          result=>{
            let almacen = {
              imagen:result.imagen
            }
            return almacen.imagen;
          }
        )
      }
    
    export const getBodegaImage= async ()=>{

        await vinaService.getBodegaImage().subscribe(
          result=>{
            let bodega = {
              imagen:result.imagen
            }
             return bodega.imagen;
          }
        )
      }
