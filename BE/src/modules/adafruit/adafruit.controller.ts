import { Controller, Get } from '@nestjs/common';
import { AdafruitService } from './adafruit.service';
import { MessagePattern } from '@nestjs/microservices';
import { FEED_PUMP } from 'src/common/constant';

@Controller('adafruit')
export class AdafruitController {
  constructor(private readonly adafruitService: AdafruitService) {}

  @MessagePattern({ cmd: 'HoanganhtrgBKU/feeds/pump' })
  getNotifications(data: any) {
    console.log(data);
  }

  @Get('publish')
  async publishMessage() {
    this.adafruitService.publish(FEED_PUMP, '1');
    return 'Message published';
  }
}
