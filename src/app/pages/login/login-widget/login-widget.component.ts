import { Component, computed, DestroyRef, inject } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { HeaderMenuComponent } from '../../../components/header-menu/header-menu.component';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../../services/api/api.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login-widget',
  standalone: true,
  imports: [HeaderMenuComponent, NzButtonComponent],
  templateUrl: './login-widget.component.html',
  styleUrl: './login-widget.component.css',
})
export class LoginWidgetComponent {
  private userService = inject(UserService);
  protected currentUser = computed(this.userService.getUser);

  menuItems = [
    { title: 'Login', link: '/login' },
    { title: 'Register', link: '/register' },
  ];

  logout() {
    this.userService.logoutUser();
  }
}
