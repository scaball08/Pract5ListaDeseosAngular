import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ListasComponent
  ],
  exports:[
    ListasComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    // se debe importar el modulo de ionic
    // para poder usar las etiquetas de ionic en el componente lista
    IonicModule
  ]
})
export class ComponentsModule { }
