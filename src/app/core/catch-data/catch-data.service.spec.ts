import { TestBed } from '@angular/core/testing';

import { CatchDataService } from './catch-data.service';

describe('CatchDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatchDataService = TestBed.get(CatchDataService);
    expect(service).toBeTruthy();
  });
});
