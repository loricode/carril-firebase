import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Pipe({
  name: 'carril'
})
export class CarrilPipe implements PipeTransform {

  transform(value:Item[] , ...args: any): Item[] {

    return value.filter(x => x.codigoCarril === args[0]);
  }

}
