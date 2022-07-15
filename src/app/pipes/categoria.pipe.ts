import { Pipe, PipeTransform } from '@angular/core';
import { Place } from '../models';

@Pipe({
  name: 'categoria'
})
export class CategoriaPipe implements PipeTransform {

  /* transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } */

  transform(values: Place[], arg: string): Place[] {
    let noticias: Place[] = [];
    for(const value of values){
      if(value.categoriaS === arg){
        noticias = [...noticias, value];
      }
    }
    return noticias;
  }

}
