import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { UserInteface } from './user.service.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: WritableSignal<UserInteface | null> = signal(null);
  public getUser = computed(() => this.currentUser());

  constructor() {}

  public loginUser(user: any) {
    this.currentUser.set(user);
  }

  public logoutUser() {
    this.currentUser.set(null);
  }
}
