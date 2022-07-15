import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaPipe } from '../pipes/categoria.pipe';

@NgModule({
  declarations: [CategoriaPipe],
  imports: [
    CommonModule,
  ],
  exports: [CategoriaPipe]
})
export class SharedModule { }
