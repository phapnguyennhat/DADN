import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/createLog.dto';
import { QueryPagination } from 'src/common/queryPagination';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async findAll(@Query() query: QueryPagination){
    return this.logService.findAll(query)
  }

  @Post()
  async create(@Body() createLogDto: CreateLogDto){
    return this.logService.create(createLogDto)
  }

  @Delete(':id')
  async delete (@Param('id') id: string ){
    return this.logService.delete(id)
  }


}
