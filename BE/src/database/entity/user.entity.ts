import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/common/baseEntity';

export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IAuthPayload {
  id: string;
  name: string;
  username: string;
  email: string;
  role: ERole;
  exp?: number;
}

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ enum: ERole, type: 'enum', default: ERole.USER })
  role: ERole;
}
