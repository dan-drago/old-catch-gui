import {
  Component,
  OnInit,
  SimpleChanges,
  Input,
  ViewEncapsulation,
  OnChanges
} from '@angular/core';

import { LocalStorageService } from '@src/app/core/local-storage/local-storage.service';
import { IPlotlySettings, IPlotlyPayLoad } from '../plotly.models';
import { Color } from 'plotly.js';

@Component({
  selector: 'app-plotly-graph',
  templateUrl: './plotly-graph.component.html',
  styleUrls: ['./plotly-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlotlyGraphComponent implements OnInit, OnChanges {
  @Input()
  payload: IPlotlyPayLoad | undefined;

  @Input()
  isMiniMode: boolean | undefined;

  private fontColor: Color = 'rgba(255,255,255,0.7)';
  // private fontColor: Color = '#21BF9B';
  private markerColor: Color = 'rgba(53,119,203,0.8)';
  private markerLineColor: Color = 'rgba(103,169,253,1.0)';
  private gridColor: Color = 'white';
  private bgColor: Color = 'rgba(255,255,255,0.2)';
  public plotlySettings: IPlotlySettings = this.setPlotly();

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    // If light-theme
    if (!this.localStorageService.isThemeDark()) {
      this.plotlySettings.data[0].marker!.color = 'rgba(0,0,0,0.5)';
      this.fontColor = 'rgba(0,0,0,0.6)';
      // this.fontColor = '#7C4EFF';
      // this.fontColor = 'red';
      this.bgColor = 'rgba(0,0,0,0.2)';
    }
    this.setPlotly();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.payload.currentValue) return;
    this.setPlotly();
  }

  setPlotly() {
    // Define/extract key params
    const payload = this.payload;
    const type = !!payload && !!payload.type ? payload.type : 'histogram';
    const meta = !!payload ? payload.meta : undefined;
    const xData = !!payload ? payload.xData : [1, 2, 3];
    const yData = !!payload && !!payload.yData ? payload.yData : undefined;
    const tooltipInfo = !!payload && !!payload.tooltipInfo ? payload.tooltipInfo : undefined;
    const isMiniMode = !!this.isMiniMode && typeof this.isMiniMode !== 'undefined';

    const newPlotlySettings = (this.plotlySettings = {
      config: { displaylogo: false, responsive: true, displayModeBar: 'hover' },
      data: [
        {
          x: xData,
          y: !!yData ? yData : undefined,
          text: tooltipInfo,
          type,
          marker: {
            color: isMiniMode
              ? ((this.markerColor as any) as string).replace('0.8', '1.0')
              : this.markerColor,
            size: isMiniMode ? 3 : 18,
            line: {
              color: this.markerLineColor,
              width: 1
            }
          },
          mode: 'markers'
        }
      ],
      layout: {
        // LABELLING
        title: !!meta && !!meta.plotTitle ? meta.plotTitle : '',
        titlefont: {
          size: 24,
          color: this.fontColor
        },

        // PLOT SIZING
        width: !!isMiniMode ? 30 : Math.round(window.innerWidth * 0.7),
        height: !!isMiniMode ? 30 : Math.round(window.innerHeight * 0.7),
        margin: !!isMiniMode ? { l: 0, r: 0, b: 0, t: 0 } : undefined,

        // PLOT BACKGROUND COLOR
        plot_bgcolor: this.bgColor,
        paper_bgcolor: this.bgColor,

        // AXES
        xaxis: {
          title: !isMiniMode && !!meta && !!meta.xAxisTitle ? meta.xAxisTitle : '',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: this.fontColor
          },
          autorange: true, // type === 'scatter',
          // range: !!xData ? [0, Math.ceil(Math.max.apply(null, xData))] : [0, 10],
          showgrid: !isMiniMode,
          gridcolor: this.gridColor,
          gridwidth: 1,
          zeroline: !isMiniMode,
          zerolinecolor: this.gridColor,
          zerolinewidth: 1,
          ticks: !!isMiniMode ? undefined : 'outside',
          tick0: 0,
          // dtick: 1, // Space between ticks; undefined for auto
          ticklen: 8,
          tickwidth: 1,
          tickcolor: this.gridColor,
          tickfont: {
            size: 14,
            color: this.fontColor
          },
          showline: !isMiniMode,
          linecolor: this.gridColor,
          linewidth: 1
        },
        yaxis: {
          title:
            !isMiniMode &&
            !!meta &&
            !!meta.yAxisTitle &&
            (!yData || (!!yData && !!yData[0] && yData[0].toString().length < 6))
              ? meta.yAxisTitle
              : '',
          titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: this.fontColor
          },
          autorange: true,
          range:
            type === 'scatter' && !!yData ? [0, Math.ceil(Math.max.apply(null, yData))] : undefined,
          showgrid: !isMiniMode,
          zeroline: !isMiniMode,
          ticks: !!isMiniMode ? undefined : 'outside',
          tick0: 0,
          dtick: undefined,
          ticklen: 8,
          tickwidth: 1,
          tickcolor: this.gridColor,
          tickfont: {
            size: 14,
            color: this.fontColor
          },
          showline: !isMiniMode,
          linecolor: this.gridColor,
          linewidth: 1,
          gridcolor: this.gridColor,
          gridwidth: 1,
          zerolinecolor: this.gridColor,
          zerolinewidth: 1
        }
      }
    });

    this.plotlySettings = newPlotlySettings;
    return newPlotlySettings;
  }
}
