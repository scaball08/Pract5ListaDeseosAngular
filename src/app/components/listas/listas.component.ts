import { Component, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html'
})
export class ListasComponent {
  
  @Input() tab:string = '1';
  @Input() terminado = false;
  
  //asociar a un elemento html 
  @ViewChild(IonList) ionLista:IonList;
  // otra forma tambien agregando una 
  //referencia local a la etiqueta html @ViewChild('lista') lista:IonList;
  
  constructor(public deseosServices: DeseosService, private router: Router,
    private alertCtrl: AlertController) {

     

    console.log(this.deseosServices.listas);

  }

  listaSeleccionada(lista:Lista){
  //console.log(lista);
  console.log( this.tab);
  this.router.navigateByUrl(`/tabs/tab${this.tab}/agregar/${lista.id}`);
  }
  borrarLista(lista:Lista){
    this.deseosServices.borrarLista(lista);
    
  }

  async editarLista(lista:Lista){
    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs:[{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder:'Nombre de la lista'
      }],

      buttons: [{
        text : 'Cancelar',
        role: 'cancel',
        handler:()=>{
        console.log('Cancelar');
        this.ionLista.closeSlidingItems();
        }
      },
      {
        text: 'Actualizar',
        handler: (data) =>{

          // la variable data recibe el valor que tiene 
          //en el input llamado titulo
          console.log(data);
          
          //validamos que no esta vacia
          if (data.titulo.length===0) {
            return
          }
         
          lista.titulo = data.titulo;
          this.deseosServices.guardarStorage();
          this.ionLista.closeSlidingItems();
        } 
      }
    
    ]
    });

     alert.present();
   
  }

}
