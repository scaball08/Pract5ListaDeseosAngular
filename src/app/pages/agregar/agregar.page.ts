import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista :Lista;
  nombreItem:string= '';

  constructor(private deseosServices:DeseosService,private activatedRoute:ActivatedRoute) {
    

      const listaId = this.activatedRoute.snapshot.paramMap.get('listaId');
        

      this.lista = this.deseosServices.obtenerLista(listaId); 
      
    
   }

  ngOnInit() {
  }

  agregarItem(){
    if(this.nombreItem.length===0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);

    this.lista.items.push(nuevoItem);

    this.nombreItem = '';

    this.deseosServices.guardarStorage();
    
  }

  borrar(i:number){
    this.lista.items.splice(i,1);
    this.deseosServices.guardarStorage();
  }

  guardaCompletada(){
     
      const pendientes = this.lista.items
                            .filter(itemData=> !itemData.completado)
                            .length;
      if(pendientes=== 0)
      {
        this.lista.TerminadaEn =  new Date();
        this.lista.terminada   =  true;
      }
      else {
        
        this.lista.TerminadaEn =  null;
        this.lista.terminada   =  false;

      }
          this.deseosServices.guardarStorage();
          console.log(this.deseosServices.listas)
  }

}
