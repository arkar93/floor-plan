import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import {
  ConditionType,
  SortType,
  SortValue,
  TrueOrFalse,
} from '../common/enum';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @ApiProperty({
    example: '10',
    description: 'Limit of results',
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    example: '1',
    description: 'Page number',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: 'Search query',
    required: false,
  })
  @IsOptional()
  search?: string;

  @ApiProperty({
    enum: ConditionType,
    description: 'Search condition',
    required: false,
  })
  @IsOptional()
  @IsEnum(ConditionType)
  condition?: ConditionType;

  @ApiProperty({
    enum: SortValue,
    description: 'Sort by field',
    required: false,
  })
  @IsOptional()
  @IsEnum(SortValue)
  sortBy?: SortValue;

  @ApiProperty({
    enum: SortType,
    description: 'Sort order',
    required: false,
  })
  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;

  @ApiProperty({
    enum: TrueOrFalse,
    description: 'Is pagination enabled',
    required: false,
  })
  @IsOptional()
  @IsEnum(TrueOrFalse)
  isPaginated?: string;
}
