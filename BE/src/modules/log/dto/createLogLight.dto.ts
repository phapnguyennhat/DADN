import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, Max } from "class-validator";
import { ELightStatus } from "src/database/entity/logLight.entity";
import { ETypeLog } from "src/database/entity/logPump.entity";

export class CreateLogLightDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    @IsPositive()
    @Max(100)
    lightIntensity: number

    @IsNotEmpty()
    @IsEnum(ELightStatus)
    lightStatus: ELightStatus

    @IsNotEmpty()
    @IsEnum(ETypeLog)
    typeLog: ETypeLog
    
    
}