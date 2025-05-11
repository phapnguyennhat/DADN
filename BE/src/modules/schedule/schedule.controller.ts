import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import JwtAuthGuard from '../auth/guard/jwt-auth.guard';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async addSchedule(@Body() data: CreateScheduleDto) {
    return this.scheduleService.addSchedule(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getSchedules() {
    return this.scheduleService.getSchedules();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.scheduleService.remove(id);
  }
}
