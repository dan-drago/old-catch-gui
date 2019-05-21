import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovingObjectSearchViewComponent } from './moving-object-search-view/moving-object-search-view.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MovingObjectSearchViewComponent],
  imports: [CommonModule, SharedModule]
})
export class DynamicPagesModule {}
