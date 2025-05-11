import { BaseEntity } from "src/common/baseEntity";
import { Column } from "typeorm";
import { Entity } from "typeorm";
import { ETypeLog } from "./logPump.entity";

export enum ELightStatus {
    ON = 'on',
    OFF = 'off'
}


@Entity()
export class LogLight extends BaseEntity {
    @Column() 
    lightIntensity: number

    @Column({type: 'enum', enum: ELightStatus}) 
    lightStatus: ELightStatus

    @Column({type: 'enum', enum: ETypeLog})
    typeLog: ETypeLog

}