import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogPump } from 'src/database/entity/logPump.entity';
import { LogLight } from 'src/database/entity/logLight.entity';
@Module({
  imports: [TypeOrmModule.forFeature([LogPump, LogLight])],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
