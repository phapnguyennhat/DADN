import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, Max } from "class-validator";
import { EPumpStatus, ETypeLog } from "src/database/entity/log.entity";

export class CreateLogDto {
  @IsNotEmpty()
  @IsNumber({maxDecimalPlaces: 1})
  @Type(() => Number)
  @IsPositive()
    @Max(100)
  temperature: number

  @IsNotEmpty()
  @IsNumber({maxDecimalPlaces: 1})
  @Type(() => Number)
  @IsPositive()
    @Max(100)
  humidity: number

  @IsNotEmpty()
  @IsEnum(EPumpStatus)
  pumpStatus: EPumpStatus

  @IsNotEmpty()
  @IsEnum(ETypeLog)
  typeLog: ETypeLog

}