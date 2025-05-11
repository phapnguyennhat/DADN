import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { ERole } from "src/database/entity/user.entity";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: 'Password must be at least 4 characters long',
  })
  password: string

  @IsEnum(ERole)
  @IsNotEmpty()
  role: ERole




}