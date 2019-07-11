import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

    listas:Lista[]=[];

    constructor() { 
      
      // PARA EJEMPLO CREAR LISTAS:
      // const lista1 = new Lista("Recolecar piedras del infinito");
      // const lista2 = new Lista("Desaparecer heroes");
      // this.listas.push(lista1,lista2);
      // console.log(this.listas);
     this.cargarStorage();


    }


    crearLista(titulo:string){
      const nuevaLista = new Lista(titulo);

      this.listas.push(nuevaLista);
      this.guardarStorage();

      return nuevaLista.id;
    }

    obtenerLista(id: string | number){

      id = Number(id);

      return this.listas.find(listaData => listaData.id === id)
    }

    guardarStorage(){

      // convertir el objetos de tipo 'Lista'
      // a un string en formato Json 
     localStorage.setItem('data', JSON.stringify(this.listas));
    }
    
    cargarStorage(){
      // se verifica si hay datos en el localstorage
      if (localStorage.getItem('data')) {

        // convertir el string en formato Json
      // a un un objeto de tipo 'Lista' 
        this.listas = JSON.parse(localStorage.getItem('data'));
      }else{
        this.listas = [];
      }
    
    }
    borrarLista(lista:Lista){
      this.listas = this.listas.filter((dataListas) => dataListas.id !== lista.id);
      this.guardarStorage();
    }


}
