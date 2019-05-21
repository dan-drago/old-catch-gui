import { Injectable } from '@angular/core';

import { IMOSData } from './catch-data.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const DATA_URL = 'https://oort.astro.umd.edu/catch/moving-object-search/?objid=909';

@Injectable()
export class CatchDataService {
  constructor(private httpClient: HttpClient) {}

  getMOVData(): Observable<IMOSData[]> {
    return this.httpClient.get(DATA_URL).pipe(
      map((data: any) => {
        // console.log('---------------');
        // console.log(Object.keys(data.resource.data[0]));
        // console.log('---------------');
        return data.resource.data;
      })
    );
  }
}
