import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationExceptionFactory {
  static create(errors: ValidationError[]) {
    const result = [];
    errors.forEach((error) => {
      const constraints = error.constraints;
      const messages = Object.keys(constraints).map((constraintKey) => ({
        [error.property]: constraints[constraintKey],
      }));
      result.push(...messages);
    });
    return new BadRequestException(result);
  }
}
