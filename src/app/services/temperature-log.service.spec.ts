import { TestBed } from '@angular/core/testing';

import { TemperatureLogService } from './temperature-log.service';

describe('TemperatureLogService', () => {
  let service: TemperatureLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
