import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from './core/local-storage/local-storage.service';
import { ILocalStorageState } from './core/local-storage/local-storage.models';
import { routeChangeTrigger } from './core/animations/route-change.animations';
import { appLoadingTrigger } from './core/animations/app-loading.animations';
import { AnimationsService } from './core/animations/animations.service';
import { IAnimEvent } from './core/animations/animations.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeChangeTrigger, appLoadingTrigger]
})
export class AppComponent implements OnInit {
  ///////////////////////////////////////////

  title = 'catch-frontend';
  selectedRoute = '';

  theme$: Observable<string>;
  localStorageState$: Observable<ILocalStorageState>;

  isHomePage = false;
  isAppLoaded = false;
  isFooterHidden = false;

  constructor(
    //
    // xxx
    private localStorageService: LocalStorageService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Stream changes to localStorage and pipe to theme$ observable
    this.localStorageState$ = this.localStorageService.getLocalStorageStream();
    this.theme$ = this.localStorageState$.pipe(
      map((s: ILocalStorageState) => s.SiteTheme.toLowerCase())
    );
    // Hacky, but only way found to re-trigger observable AFTER component initialized
    setTimeout(() => this.localStorageService.refreshStateStream(), 0);

    setTimeout(
      () =>
        this.route.queryParams.subscribe(params => {
          if (!!Object.keys(params).length) {
            if (!!params.dest && params.dest === 'neat') this.router.navigateByUrl('/neat');
          }
        }),
      0
    );
  }

  ngOnInit(): void {}

  routeChangeState(outletEvent: RouterOutlet) {
    const result =
      !!outletEvent &&
      !!outletEvent.isActivated &&
      !!outletEvent.activatedRoute &&
      !!outletEvent.activatedRoute.routeConfig &&
      outletEvent.activatedRoute.routeConfig.path;
    // Record selected route
    this.selectedRoute = result || '';
    return result;
  }

  // Trigger events on route-animation start/done
  routeChangeNotifier(animEvent: IAnimEvent) {
    if (animEvent.phaseName === 'start') {
      this.isFooterHidden = true;
      this.isHomePage = ['', 'home', 'contact'].includes(this.selectedRoute);
      this.cd.detectChanges();
    }
    if (animEvent.phaseName === 'done') {
      this.isFooterHidden = false;
    }
  }

  // When appLoading animation is finished, declare site loaded
  appLoadingNotifier(animEvent: IAnimEvent) {
    if (animEvent.phaseName === 'done') {
      AnimationsService.setSiteLoaded(true);
      this.isAppLoaded = true; // Controls initial footer entrance
    }
  }
}
