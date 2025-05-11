import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from 'env';
import LogsMiddleware from './util/log.middleware';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './util/all-exception.filter';
import { LogModule } from './modules/log/log.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BullModule } from '@nestjs/bullmq';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { AdafruitModule } from './modules/adafruit/adafruit.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      isGlobal: true,
    }),
    LogModule,
    AuthModule,
    UserModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),
    ScheduleModule,
    AdafruitModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
