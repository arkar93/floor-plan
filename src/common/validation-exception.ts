import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationExceptionFactory {
  static create(errors: ValidationError[]) {
    const result = {};
    errors.forEach((error) => {
      const constraints = error.constraints;
      const errorsArr = [];
      Object.keys(constraints).map((constraintKey) => {
        errorsArr.push(constraints[constraintKey]);
      });
      result[error.property] = errorsArr;
    });
    return new BadRequestException({ errors: result });
  }
}
