import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstThreeWords',
  
})
export class FirstThreeWordsPipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split(' ');
    if (words.length >= 3) {
      return words.slice(0, 3).join(' ');
    } else {
      return value; 
    }
  }
}
