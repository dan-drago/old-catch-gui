import {
  Component,
  OnInit,
  Inject,
  AfterContentInit,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit, AfterContentInit {
  //////////////////////////////////////////////////////////////////////

  @ViewChild('searchContent')
  elementView: ElementRef | undefined;

  // Time to smoothly expand to hidden panels' height
  transitionTime = 200;
  // Time to allow panels to collapse; required by bug https://github.com/angular/components/issues/13870
  calmingTime = 250;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

  makeAppear: any = {
    overflow: 'hidden',
    height: '0px',
    transition: `height {this.transitionTime}ms`,
    encapsulation: ViewEncapsulation.None
  };

  ngOnInit() {}

  ngAfterContentInit(): void {
    // 1st timeout: wait for material buggy animation to calm down
    setTimeout(() => {
      if (!!this.elementView) {
        const height = this.elementView.nativeElement.offsetHeight;
        this.makeAppear = {
          height: height + 'px'
        };
      }

      // 2nd timeout: after animating to height of inner content, make height auto
      setTimeout(() => {
        this.makeAppear = {
          height: 'auto'
        };
      }, this.transitionTime);

      //
    }, this.calmingTime);
  }
}
