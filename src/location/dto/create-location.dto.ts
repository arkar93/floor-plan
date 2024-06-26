import {
  IsString,
  Length,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateLocationDto {
  @IsString({ message: 'building must be a string' })
  @Length(1, 3)
  @IsNotEmpty({ message: 'building must not be empty' })
  building: string;

  @IsString({ message: 'name must be a string' })
  @MaxLength(30)
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @IsString({ message: 'number must be a string' })
  @MaxLength(30)
  @IsNotEmpty({ message: 'number must not be empty' })
  number: string;

  @IsNumber({ allowNaN: false }, { message: 'area must be a number' })
  @IsNotEmpty({ message: 'area must not be empty' })
  area: number;
}
