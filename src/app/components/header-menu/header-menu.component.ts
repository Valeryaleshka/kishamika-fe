import { Component, input, InputSignal } from '@angular/core';
import { HeaderMenu } from './header-input.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.css',
})
export class HeaderMenuComponent {
  menu: InputSignal<HeaderMenu[]> = input<HeaderMenu[]>([]);
}
