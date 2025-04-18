export {};

declare global {
 
  interface QueryPagination {
    page?: number,
    limit?: number
  }
  
  interface LogPump {
    id: string,
    createAt: string
    temperature: number,
    humidity: number,
    pumpStatus: 'on'|'off',
    typeLog: 'manual' | 'auto'
  }

  interface CreateLogPump {
      temperature: number;
      humidity: number;
      pumpStatus: 'on' | 'off';
      typeLog: 'manual' | 'auto';
  }

  interface LogLight {
    id: string,
    createAt: string,
    lightStatus: 'on' | 'off',
    typeLog: 'manual' | 'auto'
    lightIntensity: number
  }

  interface CreateLogLight {
    lightStatus: 'on' | 'off';
    typeLog: 'manual' | 'auto';
    lightIntensity: number
  }
}