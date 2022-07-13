import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetSitiosturisticosComponent } from './set-sitiosturisticos/set-sitiosturisticos.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SetSitiosturisticosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class BackendModule { }
