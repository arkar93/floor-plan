import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isNumberString } from 'class-validator';

@Injectable()
export class CheckIsNumber implements PipeTransform {
  async transform(value: string) {
    if (!isNumberString(value)) {
      throw new BadRequestException({ error: 'Invalid number format' });
    }
    return parseInt(value, 10);
  }
}
