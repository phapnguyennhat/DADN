import { HUMI_COEFFICIENT, TEMP_COEFFICIENT } from 'src/common/constant';

import { INTERCEPT } from 'src/common/constant';

export const predictPumpStatus = (temperature: number, humidity: number) => {
  const humi_coefficient = HUMI_COEFFICIENT;
  const temp_coefficient = TEMP_COEFFICIENT;
  const intercept = INTERCEPT;

  const prediction =
    humi_coefficient * humidity + temp_coefficient * temperature + intercept;

  return Math.round(prediction);
};
