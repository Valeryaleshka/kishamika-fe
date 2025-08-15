import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ImagesComponent } from './pages/images/images.component';
import { RootComponent } from './pages/root/root.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component')
            .then(m => m.HomeComponent)
        },
      { path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component')
            .then(m => m.AboutComponent)
      },
      {
        path: 'images',
        loadComponent: () =>
          import('./pages/images/images.component')
            .then(m => m.ImagesComponent)
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login-page/login-page.component')
            .then(m => m.LoginPageComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/login/login-page/login-page.component')
            .then(m => m.LoginPageComponent)
      },
    ],
  },
  { path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component')
        .then(m => m.NotFoundPageComponent)
    },
];
