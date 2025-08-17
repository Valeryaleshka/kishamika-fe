import { Component, computed, DestroyRef, inject } from '@angular/core';
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
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { omit } from 'lodash';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  providers: [ApiService],
  imports: [
    RouterModule,
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
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router);
  protected isRegisterForm = false;

  protected form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() {
    this.isRegisterForm = this.route.snapshot.data['register'];
  }

  onSubmit() {
    if (this.isRegisterForm) {
      this.api
        .post('auth/register', this.form.value)
        .pipe(take(1))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.router.navigate(['/login']).then();
        });
    } else {
      this.api
        .post('auth/login', omit(this.form.value, 'name'))
        .pipe(take(1))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((user) => {
          this.userService.loginUser(user);
          this.router.navigate(['/']).then();
        });
    }
  }
}
