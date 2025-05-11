export {};

declare global {
  interface QueryPagination {
    page?: number;
    limit?: number;
  }

  interface LogPump {
    id: string;
    createdAt: string;
    temperature: number;
    humidity: number;
    pumpStatus: "on" | "off";
    typeLog: "manual" | "auto";
  }

  interface CreateLogPump {
    temperature: number;
    humidity: number;
    pumpStatus: "on" | "off";
    typeLog: "manual" | "auto";
  }

  interface LogLight {
    id: string;
    createdAt: string;
    lightStatus: "on" | "off";
    typeLog: "manual" | "auto";
    lightIntensity: number;
  }

  interface CreateLogLight {
    lightStatus: "on" | "off";
    typeLog: "manual" | "auto";
    lightIntensity: number;
  }

  interface User {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
  interface ISchedule {
    id: string;
    name: ScheduleType;
    delay: number;
    data: "0" | "1";
    timestamp: number;
  }

  interface CreateSchedule {
    type: ScheduleType;
    startDate: Date;
    data: "0" | "1";
  }
}
