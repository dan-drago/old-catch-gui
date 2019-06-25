import { Layout, Config, Data } from 'node_modules/@types/plotly.js';

export interface IPlotlySettings {
  layout: Partial<Layout>;
  config: Partial<Config>;
  data: Data[];
}

export interface IPlotlyPayLoad {
  xData: number[];
  yData?: number[];
  tooltipInfo?: string[];
  type: 'histogram' | 'scatter';
  meta: {
    xAxisTitle: string;
    yAxisTitle: string;
    plotTitle: string;
    description: string;
  };
}
