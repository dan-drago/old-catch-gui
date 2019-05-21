import { MatSelectChange, MatSlideToggleChange } from '@angular/material';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/animations/route-change.animations';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import {
  permittedThemes,
  ILocalStorageState,
  TPermittedTheme
} from '@app/core/local-storage/local-storage.models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements AfterContentInit {
  ////////////////////////////////////////////////////

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  themes: TPermittedTheme[] = permittedThemes;
  theme$: Observable<string>;
  localStorageState$: Observable<ILocalStorageState>;

  constructor(private localStorageService: LocalStorageService) {
    // Stream changes to localStorage and pipe to theme$ observable
    this.localStorageState$ = this.localStorageService.getLocalStorageStream();
    this.theme$ = this.localStorageState$.pipe(
      map((s: ILocalStorageState) => s.SiteTheme.replace('-', ' '))
    );
  }

  // ngOnInit() {}

  ngAfterContentInit(): void {
    setTimeout(() => this.localStorageService.refreshStateStream(), 0);
  }

  onThemeSelect(event: MatSelectChange) {
    this.localStorageService.setItem('SiteTheme', event.value);
  }

  onAutoNightModeToggle(event: MatSlideToggleChange) {
    //
  }
}
