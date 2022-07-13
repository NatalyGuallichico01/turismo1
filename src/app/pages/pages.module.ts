import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { GooglemapsModule } from '../googlemaps/googlemaps.module';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    FavoritosComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ComponentesModule,
    GooglemapsModule
  ]
})
export class PagesModule { }
