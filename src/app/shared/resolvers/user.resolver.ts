import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { ApiService } from '../../services/api/api.service';
import { UserService } from '../../services/user/user.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<any> {
  private apiService = inject(ApiService);
  private userService = inject(UserService);

  resolve(): Observable<any> {
    const currentUser = this.userService.getUser();

    return this.apiService.get('auth/me').pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          this.userService.loginUser(user);
        }
        return of(user || true); // Return user if exists, otherwise true
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        // Return a value that allows the route to activate
        return of(true);
      }),
    );
  }
}
