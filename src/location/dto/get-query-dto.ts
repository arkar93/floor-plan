import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import {
  ConditionType,
  SortType,
  SortValue,
  TrueOrFalse,
} from '../common/enum';

export class QueryDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(ConditionType)
  condition?: ConditionType;

  @IsOptional()
  @IsEnum(SortValue)
  sortBy?: SortValue;

  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;

  @IsOptional()
  @IsEnum(TrueOrFalse)
  isPaginated?: string;
}
