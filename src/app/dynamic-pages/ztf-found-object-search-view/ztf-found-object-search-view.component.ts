import { Component, ViewChild, AfterViewInit, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@src/app/core/animations/route-change.animations';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { IZtfFosData } from '@src/app/core/catch-data/catch-data.models';
import { CatchDataService } from '@src/app/core/catch-data/catch-data.service';
import { Router } from '@angular/router';
import { FitsDialogComponent } from '../fits-dialog/fits-dialog.component';
import { PlotlyDialogComponent } from '../plotly/plotly-dialog/plotly-dialog.component';
import { IPlotlyPayLoad } from '../plotly/plotly.models';

interface ILabel {
  [index: string]: { label: string; description: string };
}

@Component({
  selector: 'app-ztf-found-object-search-view',
  templateUrl: './ztf-found-object-search-view.component.html',
  styleUrls: ['./ztf-found-object-search-view.component.scss']
})
export class ZtfFoundObjectSearchViewComponent implements OnInit, AfterViewInit {
  //////////////////////////////////////

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  objid: string;
  labels: ILabel | undefined;
  rawData: IZtfFosData[] | undefined;
  data: MatTableDataSource<IZtfFosData> | undefined;

  // Data to be passed to dialog plots
  // NOTE: these are needed in order to directly bind to passedData in template
  deltaData: undefined | number[];
  seeingData: undefined | number[];
  raData: undefined | number[];
  decData: undefined | number[];
  obsdateData: undefined | string[];
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
    'objid',
    // 'obsjd',
    // 'ra',
    // 'dec',
    'raDec',
    'seeing',
    'delta'
    // 'rh',
    // 'phase',
    // 'tmtp',
    // 'trueanomaly'
  ];
  hiddenColsInit: string[] = [
    //
    'airmass',
    'archive_url',
    'ccdid',
    'ddec',
    // 'dec',
    'dec3sig',
    // 'delta',
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
    'obsjd',
    'phase',
    'pid',
    'qid',
    // 'ra',
    'ra3sig',
    'rcid',
    'rdot',
    'rh',
    'sangle',
    // 'seeing',
    'selong',
    'tmtp',
    'trueanomaly',
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
      '606';
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.catchData.getZtfFosData(this.objid).subscribe(
      (data: IZtfFosData[]) => {
        // Extract data for plotly graphs
        this.seeingData = data.map(el => el.seeing);
        this.raData = data.map(el => el.ra);
        this.decData = data.map(el => el.ra);
        this.deltaData = data.map(el => el.delta);
        this.obsdateData = data.map(el => el.obsdate);
        this.rhData = data.map(el => el.rh);
        this.phaseData = data.map(el => el.phase);
        this.tmtpData = data.map(el => el.tmtp);
        this.trueanomalyData = data.map(el => el.trueanomaly);

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

    this.catchData.getZtfFosLabels().subscribe(
      (data: ILabel) => {
        this.labels = data;
        this.labels.raDec = {
          label: 'RA/Dec',
          description: this.labels.ra + ' / ' + this.labels.dec
        };
      },
      err => {
        console.log('Error:' + JSON.stringify(err));
        this.labels = undefined;
      }
    );
  }

  exportCsv() {
    return new ngxCsv(this.renderedData, 'ztf-table-data');
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
            tooltipInfo: this.obsdateData && this.obsdateData.map(el => 'Date: ' + el),
            type: 'scatter',
            meta: {
              xAxisTitle: this.labels!.ra.description,
              yAxisTitle: this.labels!.dec.description,
              plotTitle: 'RA v Dec',
              description: this.labels!.seeing.description
            }
          }
        }
      );
      dialogRef.afterClosed().subscribe((result: any) => {});
    }

    if (plot === 'seeing') {
      const dialogRef = this.dialog.open<PlotlyDialogComponent, IPlotlyPayLoad>(
        PlotlyDialogComponent,
        {
          data: {
            xData: this.seeingData!,
            type: 'histogram',
            meta: {
              xAxisTitle: true ? 'FWHM of point sources (")' : this.labels!.seeing.label,
              yAxisTitle: 'frequency',
              plotTitle: 'Seeing Distribution',
              description: this.labels!.seeing.description
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
