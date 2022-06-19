import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TemperatureLog } from '../models/temperature-log';

@Injectable({
  providedIn: 'root'
})
export class TemperatureLogService {

  constructor() { }

  getTemperatureLogs() : Observable<TemperatureLog[]>{
    return of([
      new TemperatureLog(1, "device 1", 10.10, 20.20, 1635555000),
      new TemperatureLog(2, "device 1", 10.11, 20.21, 1635555100),
      new TemperatureLog(3, "device 1", 10.13, 20.23, 1635555200),
      new TemperatureLog(4, "device 1", 10.14, 20.24, 1635555300),
      new TemperatureLog(5, "device 1", 10.15, 20.24, 1635555400),
      new TemperatureLog(6, "device 1", 11.10, 22.20, 1635555500),
      new TemperatureLog(7, "device 1", 11.12, 22.25, 1635555600),
      new TemperatureLog(8, "device 1", 11.14, 22.30, 1635555700),
      new TemperatureLog(9, "device 1", 11.16, 22.35, 1635555800),
      new TemperatureLog(10, "device 1", 11.18, 22.40, 1635555900)
    ]);
  }
}
