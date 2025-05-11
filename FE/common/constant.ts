export const FEED_PUMP = `${process.env.EXPO_PUBLIC_ADAFRUIT_AIO_USERNAME}/feeds/pump`;

export const FEED_HUMIDITY = `${process.env.EXPO_PUBLIC_ADAFRUIT_AIO_USERNAME}/feeds/humidity-newdata`;

export const FEED_DHT_20 = `${process.env.EXPO_PUBLIC_ADAFRUIT_AIO_USERNAME}/feeds/dht20-newdata`;

export const ADAFRUIT_AIO_USERNAME =
  process.env.EXPO_PUBLIC_ADAFRUIT_AIO_USERNAME;
export const ADAFRUIT_AIO_KEY = process.env.EXPO_PUBLIC_ADAFRUIT_AIO_KEY;
export const MQTT_BROKER = process.env.EXPO_PUBLIC_MQTT_BROKER;

export const BASE_URL_ADAFRUIT = `https://io.adafruit.com/api/v2/${ADAFRUIT_AIO_USERNAME}`;

export const STALETIME = 5 * 60 * 1000;

export const FEED_LED_CONTROL = `${process.env.EXPO_PUBLIC_ADAFRUIT_AIO_USERNAME}/feeds/led-control`;

export const FEED_LIGHT = `${process.env.EXPO_PUBLIC_ADAFRUIT_AIO_USERNAME}/feeds/light-newdata`;

export const HUMI_COEFFICIENT = 0.0175;
export const TEMP_COEFFICIENT = 0.0741;
export const INTERCEPT = -2.5917;
