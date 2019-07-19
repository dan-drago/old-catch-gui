import { Injectable } from '@angular/core';

import { IMOSData, IZtfFosData, INeatData } from './catch-data.models';
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

  getZtfFosLabels(): Observable<any> {
    const url = ROOT_URL + 'ztf/found/labels';
    return this.httpClient.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getNeatData(objid: string): Observable<INeatData[]> {
    // Hard code the link for now
    // const url =
    //   objid === '65803'
    //     ? 'https://oort.astro.umd.edu/catch-dev/neat/caught/a9c9e96d-118c-4a3d-b78a-714fd185d4cf/100'
    //     : 'https://oort.astro.umd.edu/catch-dev/neat/caught/5bab9b6a-b905-42ad-8430-caec53c724b9/98';

    // 65P
    // const url =
    //   'https://oort.astro.umd.edu/catch-dev/neat/caught/5bab9b6a-b905-42ad-8430-caec53c724b9/98';

    // 65803
    // const url =
    //   'https://oort.astro.umd.edu/catch-dev/neat/caught/a9c9e96d-118c-4a3d-b78a-714fd185d4cf/100';

    // C/2001 HT50
    // const url =
    //   'https://oort.astro.umd.edu/catch-dev/neat/caught/35e4ed4f-bc1e-46a9-8d3e-4869a142315f/113';

    // 16
    // const url =
    //   'https://oort.astro.umd.edu/catch-dev/neat/caught/5767957b-46fe-45a9-899b-fa6b4afd80f1/115';

    // 65P - default
    let url =
      'https://oort.astro.umd.edu/catch-dev/neat/caught/5bab9b6a-b905-42ad-8430-caec53c724b9/98';

    if (objid === 'C/2001 HT50')
      url =
        'https://oort.astro.umd.edu/catch-dev/neat/caught/35e4ed4f-bc1e-46a9-8d3e-4869a142315f/113';
    if (objid === '65803')
      url =
        'https://oort.astro.umd.edu/catch-dev/neat/caught/a9c9e96d-118c-4a3d-b78a-714fd185d4cf/100';
    if (objid === '16')
      url =
        'https://oort.astro.umd.edu/catch-dev/neat/caught/5767957b-46fe-45a9-899b-fa6b4afd80f1/115';

    return this.httpClient.get(url).pipe(
      map((data: any) => {
        return data.data;
      })
    );
  }

  getNeatLabels(): Observable<any> {
    const url = 'https://oort.astro.umd.edu/catch-dev/neat/caught/labels';

    return this.httpClient.get(url).pipe(
      map((data: any) => {
        // console.log(data);
        return data;
      })
    );
  }
}
