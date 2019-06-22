import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@src/app/core/animations/route-change.animations';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { IZtfFosData } from '@src/app/core/catch-data/catch-data.models';
import { CatchDataService } from '@src/app/core/catch-data/catch-data.service';
import { Router } from '@angular/router';
import { SearchDialogComponent } from '@src/app/shared/search/search-dialog/search-dialog.component';
import { FitsDialogComponent } from '../fits-dialog/fits-dialog.component';

@Component({
  selector: 'app-ztf-found-object-search-view',
  templateUrl: './ztf-found-object-search-view.component.html',
  styleUrls: ['./ztf-found-object-search-view.component.scss']
})
export class ZtfFoundObjectSearchViewComponent implements OnInit, AfterViewInit {
  //////////////////////////////////////

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  objid: string;
  labels: any;

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

  data: MatTableDataSource<IZtfFosData> | undefined;

  // iconUrl = 'assets/icons/logo0.png';
  iconUrl = 'assets/images/fits-thumbnail.png';

  isAllColumnsSelected = false;

  shownColsInit: string[] = [
    //
    'objid',
    'obsjd',
    'ra',
    'dec'
  ];

  hiddenColsInit: string[] = [
    //
    'airmass',
    'archive_url',
    'ccdid',
    'ddec',
    // 'dec',
    'dec3sig',
    'delta',
    'dra',
    'expid',
    'fid',
    'field',
    'filefracday',
    'filtercode',
    'foundid',
    'infobits',
    'irsa_diff_url',
    'irsa_sci_url',
    'maglimit',
    'moonillf',
    // 'objid',
    'obsdate',
    // 'obsjd',
    'phase',
    'pid',
    'qid',
    // 'ra',
    'ra3sig',
    'rcid',
    'rdot',
    'rh',
    'sangle',
    'seeing',
    'selong',
    'tmtp',
    'trueanomaly',
    'vangle',
    'vmag'
  ];

  shownCols = [...this.shownColsInit];
  hiddenCols = [...this.hiddenColsInit];

  allColumns: string[] = this.shownCols.concat(this.hiddenCols);

  pageSizeOptions = [5, 10, 25, 100];

  constructor(
    private catchData: CatchDataService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation();
    // console.log('---->>>>>', navigation);

    this.objid =
      (!!navigation &&
        !!navigation.extras &&
        !!navigation.extras.state &&
        navigation.extras.state.objid) ||
      '606';
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log('objid', this.objid);

    this.catchData.getZtfFosData(this.objid).subscribe(
      (data: IZtfFosData[]) => {
        //
        const MAX_PAGINATION_VALUE = Math.max.apply(Math, this.pageSizeOptions);
        // console.log('max_pagination_value:', MAX_PAGINATION_VALUE, data.length);
        if (data.length > MAX_PAGINATION_VALUE) {
          this.pageSizeOptions.push(data.length);
        }
        // console.log('data', data);
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

    this.catchData.getZtfFosLabels().subscribe(
      (data: IZtfFosData[]) => {
        //
        console.log('Received labels', data);
        this.labels = data;
      },
      err => {
        console.log('Error:' + JSON.stringify(err));
        this.labels = undefined;
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

  selectAllColumns() {
    this.shownCols = [...this.allColumns];
    this.hiddenCols = [];
    this.isAllColumnsSelected = true;
  }

  resetSelectedColumns() {
    this.shownCols = [...this.shownColsInit];
    this.hiddenCols = [...this.hiddenColsInit];
    this.isAllColumnsSelected = false;
  }

  applyFilter(filterValue: string) {
    if (!!this.data) {
      this.data.filter = filterValue.trim().toLowerCase();
      if (!!this.data.paginator) {
        this.data.paginator.firstPage();
      }
    }
  }

  getAllCols() {
    return ['imageUrl', ...this.shownCols];
  }

  onOpenImage(e: MouseEvent, element: IZtfFosData) {
    //
    const dialogRef = this.dialog.open(FitsDialogComponent, {
      data: {
        objid: element.objid,
        fits_url: element.archive_url
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        //
      } else {
        //
      }
    });
  }
}
