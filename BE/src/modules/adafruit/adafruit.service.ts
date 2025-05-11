import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { MqttClient } from 'mqtt';
import {
  ADAFRUIT_BROKER,
  FEED_PUMP,
  FEED_LED_CONTROL,
} from 'src/common/constant';

@Injectable()
export class AdafruitService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly configService: ConfigService) {}
  private client: MqttClient;

  async onModuleInit() {
    this.client = mqtt.connect(ADAFRUIT_BROKER, {
      username: this.configService.get('ADAFRUIT_AIO_USERNAME'),
      password: this.configService.get('ADAFRUIT_AIO_KEY'),
    });

    this.client.on('connect', () => {
      console.log('Connected to Adafruit IO');
      this.client.subscribe(FEED_PUMP, { qos: 1 }, (err) => {
        if (!err) {
          console.log('Subscribed to HoanganhtrgBKU/feeds/pump');
        }
      });
      this.client.subscribe(FEED_LED_CONTROL, { qos: 1 }, (err) => {
        if (!err) {
          console.log('Subscribed to HoanganhtrgBKU/feeds/light');
        }
      });
    });

    this.client.on('message', async (topic, message) => {
      console.log(`Received on ${topic}: ${message.toString()}`);
    });

    this.client.on('error', (err) => {
      console.error('MQTT error:', err);
    });
  }

  async onModuleDestroy() {
    if (this.client) {
      this.client.end();
      console.log('Disconnected from Adafruit IO');
    }
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message, { qos: 1 }, (err) => {
      if (err) {
        console.error('Publish error:', err);
      } else {
        console.log(`Published ${message} to ${topic}`);
      }
    });
  }
}
