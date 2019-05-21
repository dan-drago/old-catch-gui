import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage/local-storage.service';
import { CatchDataService } from './catch-data/catch-data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LocalStorageService, CatchDataService]
})
export class CoreModule {}
