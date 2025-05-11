import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import {
  FEED_LED_CONTROL,
  FEED_PUMP,
  SCHEDULE_QUEUE,
} from 'src/common/constant';
import { ScheduleType } from './dto/createSchedule.dto';
import { AdafruitService } from '../adafruit/adafruit.service';
@Processor(SCHEDULE_QUEUE)
export class ScheduleConsumer extends WorkerHost {
  constructor(private readonly adafruitService: AdafruitService) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case ScheduleType.PUMP: {
        await this.handleSchedulePump(job);
        break;
      }
      case ScheduleType.LIGHT: {
        await this.handleScheduleLight(job);
        break;
      }
    }
  }

  async handleSchedulePump(job: Job<any, any, string>): Promise<any> {
    const { data } = job.data;
    this.adafruitService.publish(FEED_PUMP, data);
  }

  async handleScheduleLight(job: Job<any, any, string>): Promise<any> {
    const { data } = job.data;
    this.adafruitService.publish(FEED_LED_CONTROL, data);
  }
}
