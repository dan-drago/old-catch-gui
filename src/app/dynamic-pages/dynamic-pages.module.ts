import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovingObjectSearchViewComponent } from './moving-object-search-view/moving-object-search-view.component';
import { SharedModule } from '../shared/shared.module';
import { ZtfFoundObjectSearchViewComponent } from './ztf-found-object-search-view/ztf-found-object-search-view.component';
import { FitsDialogComponent } from './fits-dialog/fits-dialog.component';

@NgModule({
  declarations: [
    MovingObjectSearchViewComponent,
    ZtfFoundObjectSearchViewComponent,
    FitsDialogComponent
  ],
  imports: [CommonModule, SharedModule],
  entryComponents: [FitsDialogComponent]
})
export class DynamicPagesModule {}
