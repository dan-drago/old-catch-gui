import { TestBed } from '@angular/core/testing';

import { CatchDataService } from './catch-data.service';
import { CoreModule } from '../core.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('CatchDataService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientModule],
      providers: [HttpClient]
    })
  );

  it('should be created', () => {
    const service: CatchDataService = TestBed.get(CatchDataService);
    expect(service).toBeTruthy();
  });
});
