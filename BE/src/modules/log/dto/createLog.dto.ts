import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { EPumpStatus, ETypeLog } from "src/database/entity/log.entity";

export class CreateLogDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(()=>Number)
  temperature: number

  @IsNotEmpty()
  @IsNumber()
  @Type(()=>Number)
  humidity: number

  @IsNotEmpty()
  @IsEnum(EPumpStatus)
  pumpStatus: EPumpStatus

  @IsNotEmpty()
  @IsEnum(ETypeLog)
  typeLog: ETypeLog

}