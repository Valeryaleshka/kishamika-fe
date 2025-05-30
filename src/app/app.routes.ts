import { Routes } from '@angular/router';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {ImagesComponent} from './pages/images/images.component';
import {VideoComponent} from './pages/video/video.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', children: [
      { path: '', redirectTo: '/home', pathMatch: 'full', component: HomeComponent},
      { path: '', redirectTo: '/about', pathMatch: 'full', component: AboutComponent},
      { path: '', redirectTo: '/images', pathMatch: 'full', component: ImagesComponent},
      { path: '', redirectTo: '/video', pathMatch: 'full', component: VideoComponent},

    ] },
  { path: '**', component: NotFoundPageComponent },
];
