import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  LogPump } from 'src/database/entity/logPump.entity';
import { Repository } from 'typeorm';
import { CreateLogPumpDto } from './dto/createLogPump.dto';
import { QueryPagination } from 'src/common/queryPagination';
import { LogLight } from 'src/database/entity/logLight.entity';
import { CreateLogLightDto } from './dto/createLogLight.dto';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogPump) private readonly logPumpRepo: Repository<LogPump>,
    @InjectRepository(LogLight) private readonly logLightRepo: Repository<LogLight>
  ) {}



  async findAllPump(query: QueryPagination) { 
    const {page=1, limit=10} = query

    const [data, count] = await this.logPumpRepo.findAndCount({
      skip: (page-1)* limit,
      take: limit,
      order: {createdAt: 'DESC'}
    })

    const numPage = Math.ceil(count / limit)
    
    if (page + 1 > numPage) {
      return { data, currentPage: page, nextPage: null, count }
    }
    return { data, currentPage: page, nextPage: page + 1, count }

  }

  async findAllLight(query: QueryPagination) { 
    const {page=1, limit=10} = query

    const [data, count] = await this.logLightRepo.findAndCount({
      skip: (page-1)* limit,
      take: limit,
      order: {createdAt: 'DESC'}
    })

    const numPage = Math.ceil(count / limit)
    
    if (page + 1 > numPage) {
      return { data, currentPage: page, nextPage: null, count }
    }
    return {data, currentPage: page, nextPage: page + 1, count}
  }

  async createLogPump(createLogDto: CreateLogPumpDto){
    return this.logPumpRepo.save(createLogDto)
  }

  async createLogLight(createLogLightDto: CreateLogLightDto){
    return this.logLightRepo.save(createLogLightDto)
  }

  async deleteLogPump(id: string){
    return this.logPumpRepo.delete(id)
  }

  async deleteLogLight(id: string){
    return this.logLightRepo.delete(id)
  }

}
