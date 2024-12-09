import { TestBed } from '@angular/core/testing';

import { TotalbikesService } from './totalbikes.service';

describe('TotalbikesService', () => {
  let service: TotalbikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalbikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
