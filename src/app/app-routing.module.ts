import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './static-pages/home/home.component';
import { AboutComponent } from './static-pages/about/about.component';
import { SettingsPageComponent } from './settings/settings-page/settings-page.component';
import { DocumentationComponent } from './static-pages/documentation/documentation.component';
import { ContactComponent } from './static-pages/contact/contact.component';
import { MovingObjectSearchViewComponent } from './dynamic-pages/moving-object-search-view/moving-object-search-view.component';
import { SearchComponent } from './static-pages/search/search.component';
import { ZtfFoundObjectSearchViewComponent } from './dynamic-pages/ztf-found-object-search-view/ztf-found-object-search-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'docs',
    component: DocumentationComponent,
    pathMatch: 'full'
  },
  {
    path: 'mos',
    component: MovingObjectSearchViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent,
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'ztffos',
    component: ZtfFoundObjectSearchViewComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
