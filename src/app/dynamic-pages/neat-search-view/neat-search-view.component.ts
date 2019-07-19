import { Component, ViewChild, AfterViewInit, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@src/app/core/animations/route-change.animations';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { INeatData } from '@src/app/core/catch-data/catch-data.models';
import { CatchDataService } from '@src/app/core/catch-data/catch-data.service';
import { Router } from '@angular/router';
import { FitsDialogComponent } from '../fits-dialog/fits-dialog.component';
import { PlotlyDialogComponent } from '../plotly/plotly-dialog/plotly-dialog.component';
import { IPlotlyPayLoad } from '../plotly/plotly.models';
import { sleep } from '@src/app/utils/sleep';

interface ILabelEntry {
  [index: string]: ILabel;
}
interface ILabel {
  label: string;
  description: string;
  fractionSize: number;
}

declare var JS9: any;

@Component({
  selector: 'app-neat-search-view',
  templateUrl: './neat-search-view.component.html',
  styleUrls: ['./neat-search-view.component.scss']
})
export class NeatSearchViewComponent implements OnInit, AfterViewInit {
  //////////////////////////////////////

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  objid: string;
  labels: ILabelEntry | undefined;
  rawData: INeatData[] | undefined;
  data: MatTableDataSource<INeatData> | undefined;

  // Data to be passed to dialog plots
  // NOTE: these are needed in order to directly bind to passedData in template
  deltaData: undefined | number[];
  raData: undefined | number[];
  decData: undefined | number[];
  jdData: undefined | number[];
  rhData: undefined | number[];
  phaseData: undefined | number[];
  tmtpData: undefined | number[];
  trueanomalyData: undefined | number[];

  // Table Pagination Params
  pageSizeOptions = [10, 25, 100];
  private paginator: MatPaginator | undefined;
  @ViewChild(MatPaginator) set setPaginator(content: MatPaginator) {
    this.paginator = content;
    if (!!this.data) this.data.paginator = this.paginator;
  }

  // Table Sorting Params
  private sort: MatSort | undefined;
  @ViewChild(MatSort) set setSort(content: MatSort) {
    this.sort = content;
    if (!!this.data) this.data.sort = this.sort;
  }

  iconUrl = 'assets/images/fits-thumbnail.png';

  renderedData: any;

  // Button-selected-column params
  isAllColumnsSelected = false;
  shownColsInit: string[] = [
    //
    'raDec',
    'delta',
    'rh',
    'tmtp',
    'trueanomaly'
  ];
  hiddenColsInit: string[] = [
    'airmass',
    'archive_url',
    'ddec',
    // 'dec',
    // 'delta',
    'designation',
    'dra',
    'exposure',
    'filter',
    'instrument',
    'jd',
    'phase',
    'productid',
    // 'ra',
    'rdot',
    // 'rh',
    'sangle',
    'selong',
    // 'tmtp',
    // 'trueanomaly',
    'unc_a',
    'unc_b',
    'unc_theta',
    'vangle',
    'vmag'
  ];
  shownCols = [...this.shownColsInit];
  hiddenCols = [...this.hiddenColsInit];
  allColumns: string[] = this.shownCols.concat(this.hiddenCols);

  constructor(
    private catchData: CatchDataService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation();

    this.objid =
      (!!navigation &&
        !!navigation.extras &&
        !!navigation.extras.state &&
        navigation.extras.state.objid) ||
      'xxx';
  }

  ngOnInit(): void {}

  async ngAfterViewInit() {
    // Give route-transitions time to settle
    await sleep(1000);

    // Begin loading in data from API
    this.catchData.getNeatData(this.objid).subscribe(
      (data: INeatData[]) => {
        // Extract data for plotly graphs
        this.raData = data.map(el => el.ra);
        this.decData = data.map(el => el.dec);
        this.deltaData = data.map(el => el.delta);
        this.jdData = data.map(el => el.jd);
        this.rhData = data.map(el => el.rh);
        this.phaseData = data.map(el => el.phase);
        this.tmtpData = data.map(el => el.tmtp);
        this.trueanomalyData = data.map(el => el.trueanomaly);

        // Temporary hack to fix archive_url:
        data.forEach((el, ind) => {
          data[ind] = {
            ...el,
            archive_url: el.archive_url.replace('catch-images', 'catch-neat-images')
          };
        });

        // Extract raw data before mutating data by adding combined 'raDec' property
        this.rawData = data;
        data.forEach((el, ind) => {
          data[ind] = { ...el, raDec: el.ra + ' / ' + el.dec };
        });

        // Determine array of page sizes
        const MAX_PAGINATION_VALUE = Math.max.apply(Math, this.pageSizeOptions);
        if (data.length > MAX_PAGINATION_VALUE) {
          this.pageSizeOptions.push(data.length);
        }

        // Get data in format rerquired for MatTable
        this.data = new MatTableDataSource(data);

        this.data.connect().subscribe(d => (this.renderedData = d));
      },
      err => {
        console.log('Error:' + JSON.stringify(err));
        this.data = undefined;
      }
    );

    // Begin loading in labels for data
    this.catchData.getNeatLabels().subscribe(
      (data: ILabelEntry) => {
        this.labels = data;
        this.labels.raDec = {
          label: 'RA/Dec',
          description: this.labels.ra.description + ' / ' + this.labels.dec.description,
          fractionSize: this.labels.ra.fractionSize
        };
      },
      err => {
        console.log('Error:' + JSON.stringify(err));
        this.labels = undefined;
      }
    );
  }

  exportCsv() {
    return new ngxCsv(this.renderedData, 'neat-table-data');
  }

  addRemoveColumns(col: string) {
    if (this.shownCols.includes(col) && this.shownCols.length > 1) {
      // Remove column
      const index = this.shownCols.indexOf(col);
      if (index !== -1) this.shownCols.splice(index, 1);
    } else if (this.shownCols.includes(col) && this.shownCols.length <= 1) {
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

  onOpenImage(e: MouseEvent, element: INeatData) {
    const dialogRef = this.dialog.open(FitsDialogComponent, {
      data: {
        objid: element.designation,
        fits_url: element.archive_url
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // Recommended here: https://github.com/ericmandel/js9/issues/60#issuecomment-506104711
      JS9.CloseImage();

      if (result) {
        //
      } else {
        //
      }
    });
  }

  formatCellEntry(entry: any, labels: ILabel) {
    if (typeof entry === 'number') return entry.toFixed(labels.fractionSize);
    // Parse raDec, toFix, reassemble
    if (entry.includes('/')) {
      const [ra, dec] = entry
        .split('/')
        .map((el: string) => parseFloat(el.trim()).toFixed(labels.fractionSize));
      return ra + ' / ' + dec;
    }
    return entry;
  }

  onClickPlotly(
    e: MouseEvent,
    plot: 'raDec' | 'seeing' | 'delta' | 'rh' | 'phase' | 'tmtp' | 'trueanomaly'
  ) {
    e.stopPropagation();

    if (plot === 'raDec') {
      const dialogRef = this.dialog.open<PlotlyDialogComponent, IPlotlyPayLoad>(
        PlotlyDialogComponent,
        {
          data: {
            xData: this.raData!,
            yData: this.decData!,
            tooltipInfo: this.jdData && this.jdData.map(el => 'Date: ' + julianIntToDate(el)),
            type: 'scatter',
            meta: {
              xAxisTitle: this.labels!.ra.description,
              yAxisTitle: this.labels!.dec.description,
              plotTitle: 'RA v Dec',
              description: this.labels!.ra.description
            }
          }
        }
      );
      dialogRef.afterClosed().subscribe((result: any) => {});
    }

    if (plot === 'delta') {
      const dialogRef = this.dialog.open<PlotlyDialogComponent, IPlotlyPayLoad>(
        PlotlyDialogComponent,
        {
          data: {
            xData: this.deltaData!,
            type: 'histogram',
            meta: {
              xAxisTitle: this.labels!.delta.description,
              yAxisTitle: 'frequency',
              plotTitle: 'Delta Distribution',
              description: this.labels!.delta.description
            }
          }
        }
      );
      dialogRef.afterClosed().subscribe((result: any) => {});
    }

    if (plot === 'rh') {
      const dialogRef = this.dialog.open<PlotlyDialogComponent, IPlotlyPayLoad>(
        PlotlyDialogComponent,
        {
          data: {
            xData: this.rhData!,
            type: 'histogram',
            meta: {
              xAxisTitle: this.labels!.rh.description,
              yAxisTitle: 'frequency',
              plotTitle: 'RH Distribution',
              description: this.labels!.rh.description
            }
          }
        }
      );
      dialogRef.afterClosed().subscribe((result: any) => {});
    }

    if (plot === 'phase') {
      const dialogRef = this.dialog.open<PlotlyDialogComponent, IPlotlyPayLoad>(
        PlotlyDialogComponent,
        {
          data: {
            xData: this.phaseData!,
            type: 'histogram',
            meta: {
              xAxisTitle: this.labels!.phase.description,
              yAxisTitle: 'frequency',
              plotTitle: 'Phase Distribution',
              description: this.labels!.phase.description
            }
          }
        }
      );
      dialogRef.afterClosed().subscribe((result: any) => {});
    }

    if (plot === 'tmtp') {
      const dialogRef = this.dialog.open<PlotlyDialogComponent, IPlotlyPayLoad>(
        PlotlyDialogComponent,
        {
          data: {
            xData: this.tmtpData!,
            type: 'histogram',
            meta: {
              xAxisTitle: 'Time to nearest perihelion (days)', // this.labels!.tmtp.description,
              yAxisTitle: 'frequency',
              plotTitle: ' T-Tₚ Distribution',
              description: this.labels!.tmtp.description
            }
          }
        }
      );
      dialogRef.afterClosed().subscribe((result: any) => {});
    }

    if (plot === 'trueanomaly') {
      const dialogRef = this.dialog.open<PlotlyDialogComponent, IPlotlyPayLoad>(
        PlotlyDialogComponent,
        {
          data: {
            xData: this.trueanomalyData!,
            type: 'histogram',
            meta: {
              xAxisTitle: 'True anomaly (deg)', // this.labels!.trueanomaly.description,
              yAxisTitle: 'frequency',
              plotTitle: 'True Anomaly Distribution',
              description: this.labels!.trueanomaly.description
            }
          }
        }
      );
      dialogRef.afterClosed().subscribe((result: any) => {});
    }
  }
}

function julianIntToDate(n: number) {
  const millis = (n - 2440587.5) * 86400000;
  const dateLocal = new Date(millis);
  return dateLocal.toUTCString();
}
