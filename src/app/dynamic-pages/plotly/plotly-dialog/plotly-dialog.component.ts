import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

interface IPlotlyDialog {
  type: 'histogram' | 'scatter';
  data: any;
}

@Component({
  selector: 'app-plotly-dialog',
  templateUrl: './plotly-dialog.component.html',
  styleUrls: ['./plotly-dialog.component.scss']
})
export class PlotlyDialogComponent implements OnInit {
  plotType: 'histogram' | 'scatter';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public passedPayload: IPlotlyDialog
  ) {
    this.plotType = passedPayload.type || 'histogram';
  }

  ngOnInit() {}
}
