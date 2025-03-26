import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/database/entity/log.entity';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/createLog.dto';
import { QueryPagination } from 'src/common/queryPagination';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log) private readonly logRepo: Repository<Log>,
  ) {}

  async findAll(query: QueryPagination){
    const{page=1, limit=10} = query

    const [logs, count] = await this.logRepo.findAndCount({
      skip: (page-1)* limit,
      take: limit,
      order: {createAt: 'DESC'}
    })
    return {logs, count}
  }

  async create(createLogDto: CreateLogDto){
    return this.logRepo.save(createLogDto)
  }

  async delete(id: string){
    return this.logRepo.delete(id)
  }

}
