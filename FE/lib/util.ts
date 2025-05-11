import { INTERCEPT, TEMP_COEFFICIENT } from "@/common/constant";
import { HUMI_COEFFICIENT } from "@/common/constant";

// export function calculate_heat_index(temp_f: number, humidity: number) {
//   const T = temp_f;
//   const H = humidity;
//   const HI =
//     -42.379 +
//     2.04901523 * T +
//     10.14333127 * H -
//     0.22475541 * T * H -
//     0.00683783 * T * T -
//     0.05481717 * H * H +
//     0.00122874 * T * T * H +
//     0.00085282 * T * H * H -
//     0.00000199 * T * T * H * H;
//   return HI;
// }

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

export const predictPumpStatus = (temperature: number, humidity: number) => {
  const humi_coefficient = HUMI_COEFFICIENT;
  const temp_coefficient = TEMP_COEFFICIENT;
  const intercept = INTERCEPT;

  const prediction =
    humi_coefficient * humidity + temp_coefficient * temperature + intercept;

  return Math.round(prediction);
};

export function formatDateToVietnamTime(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
