import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitioturisticoComponent } from './sitioturistico/sitioturistico.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ItemfavoritosComponent } from './itemfavoritos/itemfavoritos.component';



@NgModule({
  declarations: [
    SitioturisticoComponent,
    ItemfavoritosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ], exports: [
    SitioturisticoComponent,
    ItemfavoritosComponent
  ]
})
export class ComponentesModule { }
