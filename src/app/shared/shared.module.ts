import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from './material-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import font-awesome assets into bundle
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import './font-awesome';
import { SearchDialogComponent } from './search/search-dialog/search-dialog.component';
import { SearchContentComponent } from './search/search-content/search-content.component';

@NgModule({
  declarations: [SearchDialogComponent, SearchContentComponent],
  imports: [...[materialModules], CommonModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ...[materialModules],
    //
    SearchContentComponent
  ],
  entryComponents: [SearchDialogComponent]
})
export class SharedModule {}
