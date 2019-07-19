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

  temp = process.env.NODE_ENV === 'prod' ? 'catch-gui/' : '';

  backgroundImage = this.temp + 'assets/images/background_v1.png';

  constructor() {}

  ngAfterViewInit() {
    // require('./starry-sky.js');
  }
}
