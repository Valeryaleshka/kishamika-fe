import { computed, DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserInteface } from './user.service.interfaces';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private currentUser: WritableSignal<UserInteface | null> = signal(null);
  public getUser = computed(() => this.currentUser());

  public loginUser(user: any) {
    this.currentUser.set(user);
  }

  public logoutUser() {
    this.api
      .post('auth/logout', {})
      .pipe(take(1))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        this.currentUser.set(null);
      });
  }
}
