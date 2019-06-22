import { Injectable } from '@angular/core';

import { IMOSData, IZtfFosData } from './catch-data.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ROOT_URL = 'https://oort.astro.umd.edu/catch/';

@Injectable()
export class CatchDataService {
  constructor(private httpClient: HttpClient) {}

  getMOVData(objid: string): Observable<IMOSData[]> {
    return this.httpClient.get(ROOT_URL + 'moving-object-search/?objid=' + objid).pipe(
      map((data: any) => {
        // console.log('---------------');
        // console.log(Object.keys(data.resource.data[0]));
        // console.log('---------------');
        return data.resource.data;
      })
    );
  }

  getZtfFosData(objid?: string, seeing?: string, maglimit?: string): Observable<IZtfFosData[]> {
    let url = ROOT_URL + 'ztf/found';
    if (!!objid) url += '?objid=' + objid;
    if (!!seeing) url += '?seeing=' + seeing;
    if (!!maglimit) url += '?maglimit=' + maglimit;

    // console.log('>>> ' + url);

    return this.httpClient.get(url).pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }

  getZtfFosLabels(): Observable<IZtfFosData[]> {
    const url = ROOT_URL + 'ztf/found/labels';
    return this.httpClient.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
