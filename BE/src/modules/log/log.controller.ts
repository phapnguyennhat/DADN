import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import {  CreateLogPumpDto } from './dto/createLogPump.dto';
import { QueryPagination } from 'src/common/queryPagination';
import { CreateLogLightDto } from './dto/createLogLight.dto';
import RoleGuard from '../auth/guard/role.guard';
import { ERole } from 'src/database/entity/user.entity';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';

@Controller('log')
// @UseGuards(RoleGuard(ERole.ADMIN))
// @UseGuards(JwtAuthGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('pump')
  async findAllPump(@Query() query: QueryPagination){
    return this.logService.findAllPump(query)
  }

  @Get('light')
  async findAllLight(@Query() query: QueryPagination){
    return this.logService.findAllLight(query)
  }

  @Post('pump')
  async createLogPump(@Body() createLogDto: CreateLogPumpDto){
    return this.logService.createLogPump(createLogDto)
  }

  @Post('light')
  async createLogLight(@Body() createLogLightDto: CreateLogLightDto){
    return this.logService.createLogLight(createLogLightDto)
  }

  @Delete('pump/:id')
  async deleteLogPump (@Param('id') id: string ){
    return this.logService.deleteLogPump(id)
  }

  @Delete('light/:id')
  async deleteLogLight (@Param('id') id: string ){
    return this.logService.deleteLogLight(id)
  }



}
