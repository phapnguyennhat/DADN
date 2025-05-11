import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';

export enum ScheduleType {
  PUMP = 'pump',
  LIGHT = 'light',
}

export class CreateScheduleDto {
  @IsEnum(ScheduleType)
  @IsNotEmpty()
  type: ScheduleType;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @IsEnum(['0', '1'])
  data: '0' | '1';
}
