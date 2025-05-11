import { Module } from '@nestjs/common';
import { AdafruitService } from './adafruit.service';

import { AdafruitController } from './adafruit.controller';
@Module({
  imports: [],
  controllers: [AdafruitController],
  providers: [AdafruitService],
  exports: [AdafruitService],
})
export class AdafruitModule {}
