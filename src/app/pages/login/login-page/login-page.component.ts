import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { ContentWrapperComponent } from '../../../components/content-wrapper/content-wrapper.component';
import { CenterDirective } from '../../../derectives/center-content.directive';
import { BorderedCardComponent } from '../../../components/bordered-card/bordered-card.component';
import { FormGroupComponent } from '../../../components/form-group/form-group.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ContentWrapperComponent,
    CenterDirective,
    BorderedCardComponent,
    FormGroupComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private api = inject(ApiService);
  protected form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    this.api.get('').subscribe((res) => console.log(res));
  }

  name = '';
  password = '';
}
