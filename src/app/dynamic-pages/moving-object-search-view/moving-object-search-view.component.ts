import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@src/app/core/animations/route-change.animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IMOSData } from '@src/app/core/catch-data/catch-data.models';
import { CatchDataService } from '@src/app/core/catch-data/catch-data.service';

@Component({
  selector: 'app-moving-object-search-view',
  templateUrl: './moving-object-search-view.component.html',
  styleUrls: ['./moving-object-search-view.component.scss']
})
export class MovingObjectSearchViewComponent implements AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  /**
   * These viewchild setters will be called whenever the corresponding component is rendered
   */
  private paginator: MatPaginator | undefined;

  @ViewChild(MatPaginator) set setPaginator(content: MatPaginator) {
    this.paginator = content;
    if (!!this.data) this.data.paginator = this.paginator;
  }

  private sort: MatSort | undefined;
  @ViewChild(MatSort) set setSort(content: MatSort) {
    this.sort = content;
    if (!!this.data) this.data.sort = this.sort;
  }

  data: MatTableDataSource<IMOSData> | undefined;

  shownCols: string[] = [
    //
    'obsjd',
    'ra',
    'dec'
  ];
  hiddenCols: string[] = [
    //
    'dra',
    'ddec',
    'ra3sig',
    'dec3sig',
    'vmag',
    'rh',
    'rdot',
    'delta',
    'phase',
    'selong',
    'sangle',
    'vangle',
    'trueanomaly'
  ];

  allColumns: string[] = this.shownCols.concat(this.hiddenCols);

  pageSizeOptions = [5, 10, 25, 100];

  constructor(private catchData: CatchDataService) {}

  ngAfterViewInit() {
    this.catchData.getMOVData().subscribe(
      (data: IMOSData[]) => {
        //
        const MAX_PAGINATION_VALUE = Math.max.apply(Math, this.pageSizeOptions);
        // console.log('max_pagination_value:', MAX_PAGINATION_VALUE, data.length);
        if (data.length > MAX_PAGINATION_VALUE) {
          this.pageSizeOptions.push(data.length);
        }
        //
        this.data = new MatTableDataSource(data);
        // this.data.paginator = this.paginator;
        // this.data.sort = this.sort;
      },
      err => {
        console.log('Error:' + JSON.stringify(err));
        this.data = undefined;
      }
    );
  }

  addRemoveColumns(col: string) {
    if (this.shownCols.includes(col) && this.shownCols.length > 1) {
      // Remove column
      const index = this.shownCols.indexOf(col);
      if (index !== -1) this.shownCols.splice(index, 1);
    } else if (this.shownCols.length <= 1) {
      return;
    } else {
      // Add column and order shown cols by button order
      this.shownCols.push(col);
      this.shownCols = this.shownCols.sort(
        (a, b) => this.allColumns.indexOf(a) - this.allColumns.indexOf(b)
      );
    }
  }

  applyFilter(filterValue: string) {
    if (!!this.data) {
      this.data.filter = filterValue.trim().toLowerCase();
      if (!!this.data.paginator) {
        this.data.paginator.firstPage();
      }
    }
  }
}
