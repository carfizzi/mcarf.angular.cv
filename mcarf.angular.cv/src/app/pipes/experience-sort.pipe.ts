import { Pipe, type PipeTransform } from '@angular/core';
import { Experience } from '../interfaces/experience';

@Pipe({
  name: 'experienceSort',
  standalone: true,
})
export class ExperienceSortPipe implements PipeTransform {

  transform(value: Experience[] | null): Experience[] {
    if (!value)
      return [];
    return value.sort((a, b) => a.id - b.id);
  }

}
