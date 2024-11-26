import { TestBed } from '@angular/core/testing';

import { BikeUnitService } from './bike-unit.service';

describe('BikeUnitService', () => {
  let service: BikeUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
