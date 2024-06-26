import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { LocationService } from '../../location.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsNumberUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(LocationService)
    private readonly locationService: LocationService,
  ) {}

  async validate(number: string, _args: ValidationArguments) {
    const id = _args.object['id'];
    const location = await this.locationService.findByNumber(number);
    if (location && location.id !== id) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'number must be unique';
  }
}

export function IsNumberUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNumberUniqueConstraint,
    });
  };
}
