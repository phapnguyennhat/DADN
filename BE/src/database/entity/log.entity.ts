import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity } from "typeorm";

export enum EPumpStatus{
  ON= 'on',
  OFF= 'off'
}

export enum ETypeLog {
  MANUAL = 'manual',
  AUTO = 'auto'
}

@Entity()
export class Log extends BaseEntity{
  @Column()
  temperature: number

  @Column()
  humidity: number

  @Column( {type: 'enum', enum: EPumpStatus, })
  pumpStatus: EPumpStatus

  @Column({type: 'enum', enum:  ETypeLog })
  typeLog: ETypeLog
}