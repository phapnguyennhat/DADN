export {};

declare global {
 
  interface QueryPagination {
    page?: number,
    limit?: number
  }
  
  interface Log {
    id: string,
    createAt: string
    temperature: number,
    humidity: number,
    pumpStatus: 'on'|'off',
    typeLog: 'manual' | 'auto'
  }

  interface CreateLog {
      temperature: number;
      humidity: number;
      pumpStatus: 'on' | 'off';
      typeLog: 'manual' | 'auto';
  }
}