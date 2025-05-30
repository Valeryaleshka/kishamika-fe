import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ImagesComponent } from './pages/images/images.component';
import { VideoComponent } from './pages/video/video.component';
import { RootComponent } from './pages/root/root.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent }, // becomes /home/about
      { path: 'images', component: ImagesComponent }, // /home/images
      { path: 'video', component: VideoComponent }, // /home/video
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];
