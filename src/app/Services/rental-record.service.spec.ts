import { TestBed } from '@angular/core/testing';

import { RentalRecordService } from './rental-record.service';

describe('RentalRecordService', () => {
  let service: RentalRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
