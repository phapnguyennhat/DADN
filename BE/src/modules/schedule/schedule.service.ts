import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { SCHEDULE_QUEUE } from 'src/common/constant';
import { CreateScheduleDto } from './dto/createSchedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectQueue(SCHEDULE_QUEUE) private readonly scheduleQueue: Queue,
  ) {}

  async addSchedule(createScheduleDto: CreateScheduleDto) {
    const { type, startDate, data } = createScheduleDto;

    const delay = startDate.getTime() - Date.now();
    console.log({ delay });

    if (delay < 0) {
      throw new BadRequestException('Start date must be in the future');
    }
    await this.scheduleQueue.add(
      type,
      { data },
      { removeOnComplete: true, removeOnFail: true, delay },
    );
    return {
      message: 'Schedule pump added',
    };
  }

  async getSchedules() {
    const delayedJobs = await this.scheduleQueue.getDelayed();

    return delayedJobs.map((job) => ({
      id: job.id,
      name: job.name,
      data: job.data.data,
      delay: job.opts.delay,
      timestamp: job.timestamp,
      processedOn: job.processedOn,
      attemptsMade: job.attemptsMade,
    }));
  }

  async remove(id: string) {
    await this.scheduleQueue.remove(id);
    return {
      message: 'Schedule pump removed',
    };
  }
}
