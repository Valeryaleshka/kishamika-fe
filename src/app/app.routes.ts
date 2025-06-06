import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ImagesComponent } from './pages/images/images.component';
import { VideoComponent } from './pages/video/video.component';
import { RootComponent } from './pages/root/root.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'video', component: VideoComponent },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: LoginPageComponent,
      },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];
