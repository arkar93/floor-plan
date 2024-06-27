import {
  IsString,
  Length,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  Matches,
} from 'class-validator';
import { IsNumberUnique } from './rules/is-number-unique-constraint';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ example: 'building', description: 'Building name' })
  @IsString({ message: 'building must be a string' })
  @Length(1, 3)
  @IsNotEmpty({ message: 'building must not be empty' })
  building: string;

  @ApiProperty({ example: 'name', description: 'Location Name' })
  @IsString({ message: 'name must be a string' })
  @MaxLength(30)
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @ApiProperty({ example: 'ABC-123', description: 'Location Number' })
  @IsString({ message: 'number must be a string' })
  @Matches(/^[A-Za-z0-9-]+$/, {
    message: 'number must contain only letters, numbers, and hyphens',
  })
  @MaxLength(30)
  @IsNotEmpty({ message: 'number must not be empty' })
  @IsNumberUnique({ message: 'number must be unique' })
  number: string;

  @ApiProperty({ example: 100.25, description: 'Area of the location' })
  @IsNumber(
    { allowNaN: false, maxDecimalPlaces: 3 },
    { message: 'area must be a number and maximum decimal places is 3' },
  )
  @IsNotEmpty({ message: 'area must not be empty' })
  area: number;
}
