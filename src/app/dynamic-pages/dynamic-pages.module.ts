import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovingObjectSearchViewComponent } from './moving-object-search-view/moving-object-search-view.component';
import { SharedModule } from '../shared/shared.module';
import { PlotlyModule } from 'angular-plotly.js';

import { ZtfFoundObjectSearchViewComponent } from './ztf-found-object-search-view/ztf-found-object-search-view.component';
import { FitsDialogComponent } from './fits-dialog/fits-dialog.component';
import { PlotlyGraphComponent } from './plotly/plotly-graph/plotly-graph.component';
import { PlotlyDialogComponent } from './plotly/plotly-dialog/plotly-dialog.component';
import { NeatSearchViewComponent } from './neat-search-view/neat-search-view.component';

// Plotly object made available from CDN
declare var Plotly: any;
PlotlyModule.plotlyjs = Plotly;

@NgModule({
  declarations: [
    MovingObjectSearchViewComponent,
    ZtfFoundObjectSearchViewComponent,
    NeatSearchViewComponent,
    FitsDialogComponent,
    PlotlyGraphComponent,
    PlotlyDialogComponent
  ],
  imports: [CommonModule, SharedModule, PlotlyModule],
  entryComponents: [FitsDialogComponent, PlotlyDialogComponent]
})
export class DynamicPagesModule {}
