export interface LogLight {
    createAt: string;
    lightStatus: 'on' | 'off';
    typeLog: string;
    temperature: number;
    humidity: number;
} 