import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@src/app/core/animations/route-change.animations';
import { SearchDialogComponent } from '@src/app/shared/search/search-dialog/search-dialog.component';
// import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/animations/route-change.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  onOpen(e: MouseEvent) {
    //
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      data: {
        message: 'Hello!'
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
}
