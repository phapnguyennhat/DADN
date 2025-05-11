export const JWT_REFRESH_TOKEN = 'jwt-refresh-token';

export const SCHEDULE_QUEUE = 'scheduleQueue';

export const ADAFRUIT_BROKER = 'wss://io.adafruit.com:443/mqtt';

export const MQTT_CLIENT = 'MQTT_CLIENT';

export const ADAFRUIT_AIO_USERNAME = process.env.ADAFRUIT_AIO_USERNAME;

export const FEED_PUMP = `${ADAFRUIT_AIO_USERNAME}/feeds/pump`;

export const FEED_HUMIDITY = `${ADAFRUIT_AIO_USERNAME}/feeds/humidity`;

export const FEED_DHT_20 = `${ADAFRUIT_AIO_USERNAME}/feeds/dht20`;

export const FEED_LED_CONTROL = `${ADAFRUIT_AIO_USERNAME}/feeds/led-control`;

export const FEED_LIGHT = `${ADAFRUIT_AIO_USERNAME}/feeds/light`;
export const PUMP_MODE = `${ADAFRUIT_AIO_USERNAME}/feeds/pump-mode`;
export const LIGHT_MODE = `${ADAFRUIT_AIO_USERNAME}/feeds/light-mode`;

export const HUMI_COEFFICIENT = 0.0175;
export const TEMP_COEFFICIENT = 0.0741;
export const INTERCEPT = -2.5917;
