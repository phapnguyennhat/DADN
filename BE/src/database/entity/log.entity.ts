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
  @Column({ type: 'decimal', precision: 4, scale: 1 }) // precision: tổng chữ số, scale: số chữ số sau dấu .
  temperature: number;

  @Column({ type: 'decimal', precision: 4, scale: 1 }) // precision: 4, scale: 1 đảm bảo ví dụ 29.1
  humidity: number;

  @Column( {type: 'enum', enum: EPumpStatus})
  pumpStatus: EPumpStatus

  @Column({type: 'enum', enum:  ETypeLog })
  typeLog: ETypeLog
}