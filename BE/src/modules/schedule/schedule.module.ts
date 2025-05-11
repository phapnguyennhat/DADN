import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { BullModule } from '@nestjs/bullmq';
import { SCHEDULE_QUEUE } from 'src/common/constant';
import { ScheduleConsumer } from './schedule.consumer';
import { AdafruitModule } from '../adafruit/adafruit.module';
@Module({
  imports: [BullModule.registerQueue({ name: SCHEDULE_QUEUE }), AdafruitModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleConsumer],
})
export class ScheduleModule {}
