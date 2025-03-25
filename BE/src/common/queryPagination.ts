import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class QueryPagination{
  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  @IsPositive()
  page: number

  @IsOptional()
  @IsNumber()
  @Type(()=>Number)
  @IsPositive()
  limit: number
}