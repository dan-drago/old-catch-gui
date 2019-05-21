import { Component, Input, SimpleChanges, OnChanges, AfterViewInit } from '@angular/core';
declare const require: any;

@Component({
  selector: 'app-background-graphic',
  templateUrl: './background-graphic.component.html',
  styleUrls: ['./background-graphic.component.scss']
})
export class BackgroundGraphicComponent implements AfterViewInit {
  @Input()
  isTintShown = true;

  constructor() {}

  ngAfterViewInit() {
    require('./starry-sky.js');
  }
}
