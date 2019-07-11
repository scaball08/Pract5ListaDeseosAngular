import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pendientes:boolean = false;
  constructor(public deseosServices:DeseosService,private router:Router,
              private alertCtrl:AlertController){

    console.log(this.deseosServices.listas);
 
  }

 

  // la palabra async transforma una funcion o metodo en un PROMESA
  async agregarLista(){
    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',
      inputs:[{
        name: 'titulo',
        type: 'text',
        placeholder:'Nombre de la lista'
      }],

      buttons: [{
        text : 'Cancelar',
        role: 'cancel',
        handler:()=>{
        console.log('Cancelar');
        }
      },
      {
        text: 'Crear',
        handler: (data) =>{

          // la variable data recibe el valor que tiene 
          //en el input llamado titulo
          console.log(data);
          
          //validamos que no esta vacia
          if (data.titulo.length===0) {
            return
          }
         
         const listaId = this.deseosServices.crearLista(data.titulo);
         this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);

        } 
      }
    
    ]
    });

     alert.present();
   
  }
}
