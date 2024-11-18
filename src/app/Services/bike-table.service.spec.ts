import { TestBed } from '@angular/core/testing';

import { BikeTableService } from './bike-table.service';

describe('BikeTableService', () => {
  let service: BikeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
