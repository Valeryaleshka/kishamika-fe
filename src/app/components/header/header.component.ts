import { Component } from '@angular/core';
import { LoginWidgetComponent } from '../../pages/login/login-widget/login-widget.component';
import { HeaderMenuComponent } from '../header-menu/header-menu.component';
import { HeaderMenu } from '../header-menu/header-input.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginWidgetComponent, HeaderMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuItems: HeaderMenu[] = [
    { title: 'Home', link: '/home' },
    { title: 'About', link: '/about' },
    { title: 'Images', link: '/images' },
  ];
}
