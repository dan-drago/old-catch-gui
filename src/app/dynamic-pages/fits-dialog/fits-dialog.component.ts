import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  AfterContentInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';
import { getSimpleUID } from './uid';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import './userMenuSettings';
import { LocalStorageService } from '@src/app/core/local-storage/local-storage.service';
import { sleep } from '@src/app/utils/sleep';

declare var JS9: any;
declare var $: JQueryStatic;

@Component({
  selector: 'app-fits-dialog',
  templateUrl: './fits-dialog.component.html',
  styleUrls: ['./fits-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FitsDialogComponent implements AfterContentInit, OnDestroy {
  ////////////////////////////////////////////////////////////

  private changeSize = new Subject();

  uid = getSimpleUID();
  isLoading = true;
  isMenuShown = !!false;

  // Define initial width/height params
  js9Width: undefined | string;
  // Wrapper Heights
  js9WindowHeightFraction = 0.5;
  js9MenuBarWrapperHeight = '0px';
  readonly js9WrapperHeight = `${100 * this.js9WindowHeightFraction}vh`;
  js9ColorBarWrapperHeight = '40px';
  // 'Real' JS9 Heights
  js9MenuBarHeight: undefined | number = undefined;
  js9Height: undefined | number = undefined;
  js9ColorBarHeight: undefined | number = undefined;

  // Immutable case-sensitive required class names for transforming JS9 elements
  readonly JS9Menubar = 'JS9Menubar';
  readonly JS9 = 'JS9';
  readonly JS9Colorbar = 'JS9Colorbar';

  @ViewChild('js9MenuRef')
  js9MenuDiv: ElementRef | undefined;

  @ViewChild('js9Ref')
  js9Div: ElementRef | undefined;

  @ViewChild('js9ColorBarRef')
  js9ColorBarDiv: ElementRef | undefined;

  @ViewChild('js9TripletRef')
  js9TripletDiv: ElementRef | undefined;

  @ViewChild('temp')
  temp: ElementRef | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public passedData: { objid: string; fits_url: string },
    private localStorageService: LocalStorageService
  ) {
    this.resetJS9Display = this.resetJS9Display.bind(this);
    this.resetDivsAfterScreenResize = this.resetDivsAfterScreenResize.bind(this);
    this.adjustColorBarColoring = this.adjustColorBarColoring.bind(this);

    // Throttled window-resize listener
    this.changeSize
      .asObservable()
      .pipe(throttleTime(2000))
      .subscribe(async () => {
        await this.resetDivsAfterScreenResize();
        await this.resetJS9Display();
      });
  }

  async ngAfterContentInit(): Promise<void> {
    return new Promise(async resolve => {
      await this.resetJS9Display();
      resolve();
    });
  }

  ngOnDestroy(): void {
    this.changeSize.unsubscribe();
  }

  @HostListener('window:resize', ['$event.target'])
  public onResize(target: any) {
    this.changeSize.next(target.innerWidth);
  }

  adjustColorBarColoring() {
    // Logic to invert the color-scale color (for sake of theme color)
    if (this.localStorageService.isThemeDark()) {
      const canvases: HTMLCanvasElement[] = document.getElementsByClassName(
        'JS9ColorbarTextCanvas'
      ) as any;
      try {
        const canvas = canvases[0];
        const ctx = canvas.getContext('2d')!;
        if (!!ctx) {
          ctx.globalCompositeOperation = 'difference';
          ctx.fillStyle = 'rgba(0,0,0,0)';
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          canvas.style.backgroundColor = 'rgba(0,0,0,0)';
        }
      } catch (err) {
        console.log('CANVAS NOT FOUND');
      }
    }
  }

  toggleMenuBar() {
    this.isMenuShown = !this.isMenuShown;
    this.js9MenuBarWrapperHeight =
      !!this.isMenuShown && !!this.js9MenuBarHeight ? this.js9MenuBarHeight + 'px' : '0px';
  }

  getJS9TripletStyle() {
    const style: Partial<CSSStyleDeclaration> = { width: this.js9Width };

    if (!!this.isLoading) style.border = 'solid rgba(255,255,255,0.5) 1px';

    // Use dynamically determined heights if available
    const A = this.js9MenuBarHeight; // Exclude menubar from triplet height since it covers the main JS9 image
    const B = this.js9WrapperHeight;
    const C = this.js9ColorBarHeight;
    if (!this.isLoading && !!B && !!C) {
      style.height = `calc(${B} + ${C})`;
    } else {
      // Else use initially assigned values
      const D = this.js9MenuBarWrapperHeight;
      const E = this.js9WrapperHeight;
      const F = this.js9ColorBarWrapperHeight;
      style.height = `calc(${E} + ${F})`;
    }
    return style;
  }

  async resetJS9Display() {
    return new Promise(resolve => {
      //
      // Determine width of screen after which JS9 image won't grow AND keep image square
      // The 0.8 factor comes from the dialogs maxWidth=80vw
      const maxWidth = (window.innerHeight * this.js9WindowHeightFraction) / 0.8 + 48;
      if (window.innerWidth < maxWidth) {
        this.js9Width = 'calc(80vw - 48px)';
      } else {
        this.js9Width = this.js9WrapperHeight;
      }

      // Begin JS9 load seuqence
      setTimeout(async () => {
        // Reset JS9 divs
        JS9.displays = [];

        // Add div (is this synchronous?)
        JS9.AddDivs(this.uid);

        // Now that JS9, Menu & ColorBar are loaded:
        // ... hide unwanted items in the menu bar:
        $('#fileMenu' + this.uid + 'Menubar').css({ display: 'none' });
        $('#editMenu' + this.uid + 'Menubar').css({ display: 'none' });
        $('#helpMenu' + this.uid + 'Menubar').css({ display: 'none' });
        $('#viewMacMenu' + this.uid + 'Menubar').css({ display: 'none' });

        // ... and use their heights to determine their wrapper heights
        this.js9MenuBarHeight = (this.js9MenuDiv!.nativeElement as HTMLDivElement).offsetHeight;
        this.js9Height = (this.js9Div!.nativeElement as HTMLDivElement).offsetHeight;
        this.js9ColorBarHeight = (this.js9ColorBarDiv!
          .nativeElement as HTMLDivElement).offsetHeight;

        // You need to adjust color-scale coloring BEFORE loading FITS image
        this.adjustColorBarColoring();

        // Load external fits file to our div
        JS9.Load(
          this.passedData.fits_url,
          {
            scale: 'histeq',
            colormap: 'cool',
            onload: () => {
              JS9.SetZoom('toFit', { display: this.uid });
              this.isLoading = false;
              resolve();
            }
          },
          { display: this.uid }
        );
      }, 0);
    });
  }

  async resetDivsAfterScreenResize() {
    this.isLoading = true;

    if (
      //
      !!this.js9Div &&
      !!this.temp &&
      this.js9ColorBarDiv
    ) {
      // Main JS9
      const el: HTMLDivElement = this.js9Div.nativeElement;
      // console.log('el', el);
      // console.log('--------');
      while (el.firstChild) {
        // console.log(el.firstChild);
        el.removeChild(el.firstChild);
      }
      const classList: DOMTokenList = el.classList;
      const toRemove = Array.from(classList).filter((item: string) => item !== 'JS9');
      if (toRemove.length) {
        classList.remove(...toRemove);
      }

      // Color Bar
      // const el2: HTMLDivElement = this.temp.nativeElement;
      // const el3: HTMLDivElement = this.js9ColorBarDiv.nativeElement;

      // while (el2.firstChild) {
      //   console.log(el2.firstChild);
      //   el2.removeChild(el2.firstChild);
      // }

      // el2.appendChild(el3);

      // const classList2: DOMTokenList = el3.classList;
      // const toRemove2 = Array.from(classList2).filter((item: string) => item !== 'JS9Colorbar');
      // if (toRemove2.length) {
      //   classList2.remove(...toRemove2);
      // }
      // while (el3.firstChild) {
      //   console.log(el3);
      //   console.log(el3.firstChild);
      //   el3.removeChild(el3.firstChild);
      // }

      // el3.id = (el.id = this.uid = getSimpleUID()) + 'Colorbar';
      // el3.id = this.uid + 'Colorbar';

      // el3.parentNode!.removeChild(el3);
      // console.log('el2', el2);
      // console.log('--------');
      // while (el2.firstChild) {
      //   console.log(el2.firstChild);
      //   el2.removeChild(el2.firstChild);
      // }
      // const classList2: DOMTokenList = el.classList;
      // const toRemove2 = Array.from(classList2).filter((item: string) => item !== 'JS9');
      // if (toRemove2.length) {
      //   classList2.remove(...toRemove2);
      // }

      //
      el.id = this.uid = getSimpleUID();
      await sleep(500);
    }
  }
}
