import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    // Append dollar sign
    return `${value} $`;
  }
}
