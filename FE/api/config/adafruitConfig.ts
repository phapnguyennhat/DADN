import { ADAFRUIT_AIO_KEY, BASE_URL_ADAFRUIT } from '@/common/constant';
import axios from 'axios';

export const adafruitConfig = axios.create({
    baseURL: BASE_URL_ADAFRUIT,
    timeout: 40 * 1000, // Thời gian chờ tối đa (10 giây)
    headers: {
        'Content-Type': 'application/json', // Định dạng JSON mặc định
        'X-AIO-Key': ADAFRUIT_AIO_KEY
    },
});
