import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { HeaderMenuComponent } from '../../../components/header-menu/header-menu.component';

@Component({
  selector: 'app-login-widget',
  standalone: true,
  imports: [HeaderMenuComponent],
  templateUrl: './login-widget.component.html',
  styleUrl: './login-widget.component.css',
})
export class LoginWidgetComponent {
  protected userService = inject(UserService);

  menuItems = [
    { title: 'Login', link: '/login' },
    { title: 'Register', link: '/register' },
  ];

  logout() {
    console.log('Logged Out');
  }
}
