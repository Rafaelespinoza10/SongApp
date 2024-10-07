
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})

export class DurationPipe implements PipeTransform {
  transform(value: number): string {

      if(value < 0 ){
        return '00:00';
      }

      const minutes = Math.floor(value/60);
      const seconds = minutes % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}
